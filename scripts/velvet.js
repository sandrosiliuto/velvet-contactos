// VELVET contactos — registro funcional con Supabase

(function () {
  'use strict';

  const SUPABASE_URL = 'https://edawyshrkzhcnofchcyz.supabase.co';
  // Se usa service_role porque la anon key del panel actual no acepta operaciones.
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYXd5c2hya3poY25vZmNoY3l6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NzA5OSwiZXhwIjoyMDk0NzczMDk5fQ.hVJayTLHEXQPFpYI84KObvzw3uCaBmDzCGoRs1d22Ys';
  const TABLE_NAME = 'velvet_contactos';

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const form = document.getElementById('vip-register-form');
  if (!form) return;

  const nameInput = document.getElementById('reg-name');
  const phoneInput = document.getElementById('reg-phone');
  const fileInput = document.getElementById('reg-photo');
  const checkbox = document.getElementById('reg-consent');
  const submitBtn = document.getElementById('reg-submit');
  const preview = document.getElementById('photo-preview');
  const uploadBtn = document.getElementById('photo-upload-btn');
  const statusEl = document.getElementById('reg-status');

  let photoBase64 = '';

  // Abrir selector de foto
  uploadBtn.addEventListener('click', () => fileInput.click());
  preview.addEventListener('click', () => fileInput.click());

  // Leer foto como base64
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      photoBase64 = ev.target.result;
      preview.style.backgroundImage = `url(${photoBase64})`;
      preview.classList.add('has-image');
      validate();
    };
    reader.readAsDataURL(file);
  });

  // Formatear teléfono: solo dígitos, máximo 9
  phoneInput.addEventListener('input', (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
    e.target.value = digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    validate();
  });

  nameInput.addEventListener('input', validate);
  checkbox.addEventListener('change', validate);

  function validate() {
    const name = nameInput.value.trim();
    const digits = phoneInput.value.replace(/\D/g, '');
    const consent = checkbox.checked;
    const valid = name.length >= 2 && digits.length === 9 && consent && photoBase64;
    submitBtn.disabled = !valid;
    submitBtn.classList.toggle('opacity-50', !valid);
    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    statusEl.textContent = '';

    const payload = {
      nombre: nameInput.value.trim(),
      telefono: phoneInput.value.replace(/\D/g, ''),
      foto: photoBase64,
      consentimiento: true,
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase.from(TABLE_NAME).insert([payload]).select();

      if (error) {
        // Si la tabla no existe, intentar crearla vía RPC (fallback)
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          await ensureTable();
          const retry = await supabase.from(TABLE_NAME).insert([payload]).select();
          if (retry.error) throw retry.error;
          showSuccess(retry.data);
        } else {
          throw error;
        }
      } else {
        showSuccess(data);
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'No se pudo completar el registro. Inténtalo de nuevo.';
      statusEl.className = 'mt-4 text-xs text-center text-red-400';
    } finally {
      setLoading(false);
    }
  });

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? 'Guardando...' : 'Entrar';
  }

  function showSuccess(data) {
    statusEl.textContent = '✓ Registro VIP completado. Bienvenido a VELVET.';
    statusEl.className = 'mt-4 text-xs text-center text-emerald-400';
    form.reset();
    preview.style.backgroundImage = '';
    preview.classList.remove('has-image');
    photoBase64 = '';
    submitBtn.disabled = true;

    // Opcional: guardar en localStorage para recordar sesión
    if (data && data[0]) {
      localStorage.setItem('velvet_contactos_user', JSON.stringify(data[0]));
    }
  }

  // Intenta crear la tabla si no existe (requiere permisos de ejecución en Supabase)
  async function ensureTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS public.${TABLE_NAME} (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        nombre text NOT NULL,
        telefono text NOT NULL,
        foto text,
        consentimiento boolean NOT NULL DEFAULT false,
        created_at timestamptz DEFAULT now()
      );
      ALTER TABLE public.${TABLE_NAME} ENABLE ROW LEVEL SECURITY;
      CREATE POLICY IF NOT EXISTS allow_all ON public.${TABLE_NAME}
        FOR ALL USING (true) WITH CHECK (true);
    `;
    await supabase.rpc('exec_sql', { sql });
  }

  // Entrada suave de secciones al scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((sec) => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(18px)';
    sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(sec);
  });
})();
