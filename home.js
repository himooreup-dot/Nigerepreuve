// Home page JS
document.addEventListener('DOMContentLoaded', () => {
  const stats = DB.getStats();

  // Animate counters
  const cntSujets = document.getElementById('cnt-sujets');
  const cntMatieres = document.getElementById('cnt-matieres');
  const cntUsers = document.getElementById('cnt-users');

  if (cntSujets) animateCount(cntSujets, stats.sujets);
  if (cntMatieres) animateCount(cntMatieres, stats.matieres);
  if (cntUsers) animateCount(cntUsers, Math.max(stats.users, 1240));

  // Recent sujets
  const recentGrid = document.getElementById('recentGrid');
  if (recentGrid) {
    const recent = DB.getSujets().slice(0, 6);
    recentGrid.innerHTML = recent.map(s => renderSujetCard(s)).join('');
  }
});
