module.exports = (req, res) => res.status(200).json({
  ok: true,
  profile: {
    pseudo: "Invité",
    level: 1,
    xp: 0,
    gems: 12,
    streak: 0,
    note: "Profil local en bêta : la persistance réelle viendra avec les comptes."
  }
});
