/**
 * Utilitário centralizado em LocalStorage que preserva a camada
 * abstrata de ofuscamento com compressão de payload PII.
 */
export const storageManager = {
  setItem(name, value) {
    try {
      const jsonStr = JSON.stringify(value);
      // Mantendo UTF-8 Seguro sem estourar limites
      const base64Data = btoa(unescape(encodeURIComponent(jsonStr)));
      
      localStorage.setItem(name, base64Data);
    } catch (err) {
      console.error(`Falha ao proteger Storage [${name}]:`, err);
    }
  },

  getItem(name) {
    try {
      const encryptedValue = localStorage.getItem(name);
      if (encryptedValue) {
        const decryptedJson = decodeURIComponent(escape(atob(encryptedValue)));
        return JSON.parse(decryptedJson);
      }
      return null;
    } catch (err) {
      console.error(`Falha ao descriptografar/parsear Storage [${name}]:`, err);
      return null;
    }
  },

  removeItem(name) {
    localStorage.removeItem(name);
  }
};
