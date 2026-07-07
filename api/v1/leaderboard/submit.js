module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    stored: false,
    mode: 'local-demo',
    message: 'Base multijoueur non configurée. Prochaine étape : SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY dans Vercel.'
  });
};
