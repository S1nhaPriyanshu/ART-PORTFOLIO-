<template>
  <div class="file-upload" :class="{ dragging }" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="onDrop" id="file-upload">
    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" multiple class="file-input-hidden" />
    <div class="upload-zone" @click="$refs.fileInput.click()">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      <p class="upload-text">Drag & drop reference images, or <span class="upload-link">browse</span></p>
      <span class="upload-hint">PNG, JPG, WEBP up to 10MB each (max 5 files)</span>
    </div>
    <div v-if="files.length" class="preview-grid">
      <div v-for="(file, i) in files" :key="i" class="preview-item">
        <img :src="file.preview" :alt="file.name" />
        <button class="remove-btn" @click.stop="removeFile(i)" aria-label="Remove">&times;</button>
        <span class="file-name">{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:files'])
const fileInput = ref(null)
const files = ref([])
const dragging = ref(false)
const MAX_FILES = 5
const MAX_SIZE = 10 * 1024 * 1024

function processFiles(fileList) {
  const remaining = MAX_FILES - files.value.length
  const newFiles = Array.from(fileList).slice(0, remaining).filter(f => f.size <= MAX_SIZE && f.type.startsWith('image/'))
  newFiles.forEach(f => {
    const reader = new FileReader()
    reader.onload = (e) => { files.value.push({ file: f, name: f.name, preview: e.target.result }) }
    reader.readAsDataURL(f)
  })
}

function onFileChange(e) { processFiles(e.target.files) }
function onDrop(e) { dragging.value = false; processFiles(e.dataTransfer.files) }
function removeFile(i) { files.value.splice(i, 1) }

watch(files, (v) => emit('update:files', v.map(f => f.file)), { deep: true })
</script>

<style scoped>
.file-upload { border: 2px dashed rgba(201,169,110,0.15); border-radius: var(--radius-card); transition: all var(--duration-fast); }
.file-upload.dragging { border-color: var(--color-gold); background: rgba(201,169,110,0.05); }
.file-input-hidden { display: none; }
.upload-zone { padding: 2rem; text-align: center; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.upload-text { font-size: 0.95rem; color: rgba(244,239,230,0.6); }
.upload-link { color: var(--color-gold); text-decoration: underline; cursor: pointer; }
.upload-hint { font-family: var(--font-mono); font-size: 0.6rem; color: var(--color-muted); letter-spacing: 0.05em; }
.preview-grid { display: flex; gap: 0.75rem; padding: 0 1rem 1rem; flex-wrap: wrap; }
.preview-item { position: relative; width: 80px; height: 80px; border-radius: 0.5rem; overflow: hidden; border: 1px solid rgba(201,169,110,0.1); }
.preview-item img { width: 100%; height: 100%; object-fit: cover; }
.remove-btn { position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.7); border: none; color: var(--color-cream); font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.file-name { position: absolute; bottom: 0; left: 0; right: 0; padding: 2px 4px; font-size: 0.5rem; background: rgba(0,0,0,0.7); color: var(--color-cream); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
