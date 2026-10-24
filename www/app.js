/* Caravane Dentaire — application hors ligne (PWA). Données stockées sur le téléphone. */
'use strict';
const VERSION = '1.1';
const KEY = 'caravane-dentaire-v1';

/* ---------- Listes de référence ---------- */
const ACTES = [
  ['EXAMEN / DÉPISTAGE','Examen et orientation'],['RAS','Examen et orientation'],['DÉPISTAGE ODF','Examen et orientation'],
  ['ORDONNANCE RX','Examen et orientation'],['ORDONNANCE TTT MEDIC','Examen et orientation'],['FICHE DE LIAISON','Examen et orientation'],
  ['ORIENTATION / RENDEZ-VOUS','Examen et orientation'],
  ['SENSIBILISATION / BROSSAGE','Prévention'],['SEALANT','Prévention'],['FLUORATION','Prévention'],["SDF (FLUORURE DIAMINE D'ARGENT)",'Prévention'],
  ['DETARTRAGE','Parodontie'],
  ['COMPOSITE','Soins conservateurs'],['AMALGAME','Soins conservateurs'],['CIV / VI','Soins conservateurs'],
  ['ART (VI SANS FRAISAGE)','Soins conservateurs'],['OBTURATION PROVISOIRE','Soins conservateurs'],
  ['COIFFAGE PULPAIRE','Endodontie'],['PULPOTOMIE+VI','Endodontie'],['PULPECTOMIE','Endodontie'],
  ['PANSEMENT CALMANT','Urgence'],['EXTRACTION','Chirurgie'],['INCISION / DRAINAGE ABCÈS','Chirurgie']
];
const SPECS = ['OC','PATH','PARO','ODF','CHIR','PREV','PEDO','CONSULTATION'];
const FONCTIONS = ['Dentiste','Étudiant(e) en médecine dentaire','Assistant(e) dentaire','Infirmier(ère)','Médecin','Pharmacien(ne)','Technicien',
  'Coordinateur(trice)','Animateur(trice) sensibilisation','Photographe / communication','Logistique','Chauffeur','Bénévole'];
const MALADIES = ['Aucune','Asthme / Allergie','Diabète','Épilepsie / Convulsions','Maladie cardiaque','Maladie rénale','Anémie sévère / Drépanocytose',
  'Tuberculose','Hépatite','Plusieurs (préciser en observation)','Autre (préciser en observation)'];
const HANDICAPS = ['Aucun','Moteur (difficulté à marcher, infirmité, paralysie)','Visuel (baisse de vue / cécité)','Auditif (surdité / malentendant)',
  'Langage (bégaiement / mutisme)',"Intellectuel / psychique (trisomie, autisme, retard mental, troubles de l'attention)",
  'Bucco-dentaire (fente labio-palatine, malformation)','Plusieurs (préciser en observation)','Autre (préciser en observation)'];
const ALLERGIES = ['Aucune','Allergie médicamenteuse','Allergie alimentaire','Médicamenteuse et alimentaire','Autre allergie'];
const LTYPES = ['École','Centre de santé','Dispensaire','Association','Autre'];
const CTYPES = ['Ponctuelle – une journée','Ponctuelle – plusieurs jours','Périodique – hebdomadaire','Périodique – mensuelle'];
const CATS = ['ATB','ANTI INFLAM','CORTICOIDES','PARACETAMOLES','CODEINE','ANTISEPTIQUE LOCAL','ANTIFONGIQUE','IPP / PROTECTEUR GASTRIQUE','HYGIÈNE BUCCO-DENTAIRE','AUTRE'];
const SEXES = ['','Fille','Garçon'];
const CATALOGUE = [
  ['BISPIRAZOLE 1,5 MUI/250 MG CP 15','ATB','Médicament'],['AZIX 40 MG/ML SUSP 1500 MG','ATB','Médicament'],
  ['COTIPRED 20 MG CP EFF 20','CORTICOIDES','Médicament'],['DOLIPRANE 150 MG SACH 12','PARACETAMOLES','Médicament'],
  ['DOLIPRANE 300 MG SACH 12','PARACETAMOLES','Médicament'],['DOLIPRANE 500 MG CP 20','PARACETAMOLES','Médicament'],
  ['PRAZOL 20 MG GL 7','IPP / PROTECTEUR GASTRIQUE','Médicament'],
  ['BROSSE À DENTS ENFANT','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],['BROSSE À DENTS ADULTE','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],
  ['DENTIFRICE FLUORÉ ENFANT','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],['DENTIFRICE FLUORÉ ADULTE','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],
  ['KIT HYGIÈNE (BROSSE + DENTIFRICE)','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],['FIL DENTAIRE','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],
  ['BAIN DE BOUCHE','HYGIÈNE BUCCO-DENTAIRE','Parapharmacie'],
  ['AMOXIL 250','ATB','Médicament'],['AMOXIL 500','ATB','Médicament'],['AMOXIL 1g','ATB','Médicament'],['AMOXIL sirop 125 mg/5 ml','ATB','Médicament'],
  ['AMOXIL sirop 250 mg/5 ml','ATB','Médicament'],['AUGMENTIN 250','ATB','Médicament'],['AUGMENTIN 500','ATB','Médicament'],['AUGMENTIN 1g','ATB','Médicament'],
  ['AUGMENTIN sirop enfant','ATB','Médicament'],['FLAGYL sirop 125 mg/5 ml','ATB','Médicament'],['FLAGYL 250','ATB','Médicament'],['FLAGYL 500','ATB','Médicament'],
  ['RODOGYL','ATB','Médicament'],['AZITHROMYCINE sirop 200 mg/5 ml','ATB','Médicament'],['AZITHROMYCINE 250','ATB','Médicament'],
  ['CLINDAMYCINE 150','ATB','Médicament'],['CLINDAMYCINE 300','ATB','Médicament'],
  ['IBUPROFÈNE sirop 100 mg/5 ml','ANTI INFLAM','Médicament'],['IBUPROFÈNE 200','ANTI INFLAM','Médicament'],['IBUPROFÈNE 400','ANTI INFLAM','Médicament'],
  ['ACIDE NIFLUMIQUE suppo enfant','ANTI INFLAM','Médicament'],['KÉTOPROFÈNE 100','ANTI INFLAM','Médicament'],
  ['PREDNISOLONE 5 mg','CORTICOIDES','Médicament'],['PREDNISOLONE 20 mg','CORTICOIDES','Médicament'],['BÉTAMÉTHASONE gouttes 0,05 %','CORTICOIDES','Médicament'],
  ['PARACÉTAMOL sirop 2,4 %','PARACETAMOLES','Médicament'],['PARACÉTAMOL sachet enfant','PARACETAMOLES','Médicament'],
  ['PARACÉTAMOL suppo enfant','PARACETAMOLES','Médicament'],['PARACÉTAMOL 500','PARACETAMOLES','Médicament'],['PARACÉTAMOL 1g','PARACETAMOLES','Médicament'],
  ['PARACÉTAMOL + CODÉINE (≥ 12 ans)','CODEINE','Médicament'],['CHLORHEXIDINE bain de bouche 0,12 % (≥ 6 ans)','ANTISEPTIQUE LOCAL','Médicament'],
  ['NYSTATINE suspension buvable','ANTIFONGIQUE','Médicament'],['MICONAZOLE gel buccal','ANTIFONGIQUE','Médicament']
];

/* ---------- Données ---------- */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
function defaultState(){
  const fo = 'BOTTU – Direct. Glob. Dons aux associations';
  const bl = [['BL2610-16691','BISPIRAZOLE 1,5 MUI/250 MG CP 15','R159','2028-01-01',25,41.99],['BL2610-16691','COTIPRED 20 MG CP EFF 20','R1212','2029-04-01',25,23.81],
    ['BL2610-16691','DOLIPRANE 150 MG SACH 12','P1715-2','2027-05-01',25,5.40],['BL2610-16691','DOLIPRANE 300 MG SACH 12','R1392','2028-04-01',25,7.15],
    ['BL2610-16691','DOLIPRANE 500 MG CP 20','R324','2029-01-01',25,5.73],['BL2610-16691','PRAZOL 20 MG GL 7','R1406-3','2028-10-01',25,16.69],
    ['BL2610-16689','AZIX 40 MG/ML SUSP 1500 MG','R1393','2029-04-01',25,44.50]];
  return {
    version: VERSION,
    reglages: { poste: '', refDepart: 1 },
    caravane: { nom: 'Caravane bucco-dentaire Khouribga et régions', type: 'Ponctuelle – plusieurs jours', ville: 'Khouribga et régions',
      debut: '2026-10-26', fin: '2026-10-30', association: 'Enfance Sourire', responsable: '', tel: '' },
    lieux: [{ code: '01', nom: '', type: 'École', ville: 'Khouribga', contact: '', tel: '' }],
    planning: ['2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30'].map(d => ({ id: 'pl-' + d, date: d, lieu: '', horaires: '', resp: '' })),
    participants: [], enfants: [], actes: [], remises: [],
    entrees: bl.map(([b,p,l,per,q,pu]) => ({ id: 'bl-' + b + '-' + l, date: '2026-10-23', bl: b, fournisseur: fo, produit: p, lot: l, peremption: per, qte: q, pu })),
    distributions: [],
    produits: CATALOGUE.map(([nom,cat,type]) => ({ nom, cat, type })),
    actesListe: ACTES.map(([nom,type]) => ({ nom, type }))
  };
}
let S;
function load(){
  try{ const raw = localStorage.getItem(KEY); S = raw ? JSON.parse(raw) : defaultState(); }catch(e){ S = defaultState(); }
  const d = defaultState();
  for (const k of Object.keys(d)) if (S[k] === undefined) S[k] = d[k];
  if (S.caravane && !S.caravane.association) S.caravane.association = 'Enfance Sourire';
}
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){ toast("Enregistrement impossible : mémoire du téléphone pleine ?"); }
}
try{ navigator.storage && navigator.storage.persist && navigator.storage.persist(); }catch(e){}

/* ---------- Utilitaires ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0,10); };
const fd = iso => iso ? iso.split('-').reverse().join('/') : '';
const fdShort = iso => iso ? iso.slice(8,10) + '/' + iso.slice(5,7) : '';
const JOURS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const jour = iso => iso ? JOURS[new Date(iso + 'T12:00:00').getDay()] : '';
const num = n => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(n || 0);
const yearRef = () => (S.caravane.debut ? +S.caravane.debut.slice(0,4) : new Date().getFullYear());
const age = e => e.annee ? yearRef() - (+e.annee) : '';
const lieuNom = code => { const l = S.lieux.find(x => x.code === code); return l ? (l.nom || ('Lieu ' + code)) : (code ? 'Lieu ' + code : ''); };
const typeActe = nom => (S.actesListe.find(a => a.nom === nom) || {}).type || '';
const prod = nom => S.produits.find(p => p.nom === nom) || { nom, cat: 'AUTRE', type: 'Médicament' };
const enfantByRef = ref => S.enfants.find(e => e.ref === ref);
function sante(e){
  if (!e) return [];
  const out = [];
  if (e.maladie && e.maladie !== 'Aucune') out.push(e.maladie);
  if (e.handicap && e.handicap !== 'Aucun') out.push(e.handicap);
  if (e.allergie && e.allergie !== 'Aucune') out.push(e.allergie + (e.allergiePrecision ? ' : ' + e.allergiePrecision : ''));
  return out;
}
const allergieMed = e => e && /médicamenteuse/i.test(e.allergie || '');
function nextRef(code){
  let max = (+S.reglages.refDepart || 1) - 1;
  for (const e of S.enfants){ const [n, l] = e.ref.split('/'); if (l === code && +n > max) max = +n; }
  return String(max + 1).padStart(3, '0') + '/' + code;
}
function stock(){
  const m = {};
  for (const p of S.produits) m[p.nom] = { ...p, recu: 0, remis: 0, distrib: 0, valeur: 0, per: '' };
  const g = n => (m[n] ||= { ...prod(n), recu: 0, remis: 0, distrib: 0, valeur: 0, per: '' });
  for (const x of S.entrees){ const r = g(x.produit); r.recu += +x.qte || 0; r.valeur += (+x.qte || 0) * (+x.pu || 0); if (x.peremption && (!r.per || x.peremption < r.per)) r.per = x.peremption; }
  for (const x of S.remises) g(x.produit).remis += +x.qte || 1;
  for (const x of S.distributions) g(x.produit).distrib += +x.qte || 0;
  const today = todayISO(), six = new Date(); six.setMonth(six.getMonth() + 6); const sixISO = six.toISOString().slice(0,10);
  return Object.values(m).map(r => {
    r.reste = r.recu - r.remis - r.distrib;
    r.alerte = r.reste < 0 ? ['alert','Stock négatif : entrée manquante ?'] : r.recu === 0 ? null : r.reste === 0 ? ['alert','Épuisé']
      : r.reste <= 5 ? ['warn','Stock faible'] : (r.per && r.per < today) ? ['alert','Périmé'] : (r.per && r.per < sixISO) ? ['warn','Péremption < 6 mois'] : null;
    return r;
  });
}
function toast(msg){
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
const opts = (list, val, blank = true) => (blank ? '<option value=""></option>' : '') +
  list.map(o => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}"${String(v) === String(val ?? '') ? ' selected' : ''}>${esc(l)}</option>`; }).join('');
const field = (name, label, val, type = 'text', extra = '') =>
  `<label class="f"><span>${label}</span><input name="${name}" type="${type}" value="${esc(val ?? '')}" ${extra}></label>`;
const sel = (name, label, list, val, blank = true, extra = '') =>
  `<label class="f"><span>${label}</span><select name="${name}" ${extra}>${opts(list, val, blank)}</select></label>`;
const area = (name, label, val) => `<label class="f"><span>${label}</span><textarea name="${name}">${esc(val ?? '')}</textarea></label>`;
const formData = f => Object.fromEntries(new FormData(f).entries());

/* ---------- Fenêtres (feuilles du bas) ---------- */
let sheetStack = [];
function openSheet(title, html, mount){
  const root = $('#sheet-root');
  const el = document.createElement('div'); el.className = 'sheet';
  el.innerHTML = `<div class="panel" role="dialog" aria-label="${esc(title)}"><div class="head"><h2>${esc(title)}</h2><button class="x" aria-label="Fermer">×</button></div><div class="body">${html}</div></div>`;
  el.addEventListener('click', e => { if (e.target === el) closeSheet(); });
  el.querySelector('.x').onclick = closeSheet;
  root.appendChild(el); sheetStack.push(el);
  if (mount) mount(el.querySelector('.body'), el);
  return el;
}
function closeSheet(){ const el = sheetStack.pop(); if (el) el.remove(); render(); }
function closeAll(){ while (sheetStack.length) sheetStack.pop().remove(); render(); }
function confirmInline(container, msg, onYes){
  const box = document.createElement('div'); box.className = 'confirm';
  box.innerHTML = `<span class="sub">${esc(msg)}</span><button class="btn danger small" type="button">Oui, supprimer</button><button class="btn ghost small" type="button">Annuler</button>`;
  box.children[1].onclick = onYes; box.children[2].onclick = () => box.remove();
  container.appendChild(box);
}

/* ---------- Navigation ---------- */
let tab = 'bilan', pharmaTab = 'stock', filtreJour = '', recherche = '', filtreLieu = '';
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => { tab = b.dataset.tab; closeAll(); window.scrollTo(0, 0); });
function render(){
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  $('#hdr-t').textContent = S.caravane.nom || 'Caravane dentaire';
  $('#hdr-s').textContent = [S.caravane.debut ? 'du ' + fd(S.caravane.debut) : '', S.caravane.fin ? 'au ' + fd(S.caravane.fin) : '', S.reglages.poste ? '· ' + S.reglages.poste : ''].filter(Boolean).join(' ');
  const v = $('#view');
  ({ bilan: viewBilan, enfants: viewEnfants, pharma: viewPharma, equipe: viewEquipe, plus: viewPlus })[tab](v);
}

/* ---------- Bilan ---------- */
function countBy(arr, f){ const m = new Map(); for (const x of arr){ const k = f(x); if (k) m.set(k, (m.get(k) || 0) + 1); } return [...m].sort((a,b) => b[1] - a[1]); }
function sumBy(arr, f, q){ const m = new Map(); for (const x of arr){ const k = f(x); if (k) m.set(k, (m.get(k) || 0) + q(x)); } return [...m].sort((a,b) => b[1] - a[1]); }
function bars(pairs, total){
  if (!pairs.length) return '<div class="empty">Rien pour l\'instant.</div>';
  const max = Math.max(...pairs.map(p => p[1]));
  return '<div class="bars">' + pairs.map(([k, n]) => `<div class="b"><span>${esc(k)}</span><span class="n">${n}${total ? ' · ' + Math.round(n / total * 100) + ' %' : ''}</span><div class="track"><span style="width:${max ? n / max * 100 : 0}%"></span></div></div>`).join('') + '</div>';
}
function stats(day){
  const actes = S.actes.filter(a => !day || a.date === day);
  const remises = S.remises.filter(r => !day || r.date === day);
  const refs = new Set(actes.map(a => a.ref));
  const enfants = S.enfants.filter(e => refs.has(e.ref));
  const soins = actes.filter(a => typeActe(a.nature) !== 'Examen et orientation');
  return { actes, remises, enfants, soins,
    dents: actes.filter(a => a.dent).length,
    unites: remises.reduce((s, r) => s + (+r.qte || 1), 0),
    distrib: S.distributions.filter(d => !day || d.date === day).reduce((s, d) => s + (+d.qte || 0), 0) };
}
function viewBilan(v){
  const days = [...new Set([...S.planning.map(p => p.date), ...S.actes.map(a => a.date)].filter(Boolean))].sort();
  const st = stats(filtreJour);
  const santeE = st.enfants.filter(e => sante(e).length);
  const ageMoy = st.enfants.filter(e => e.annee).length ? (st.enfants.filter(e => e.annee).reduce((s, e) => s + age(e), 0) / st.enfants.filter(e => e.annee).length) : 0;
  v.innerHTML = `
    <div class="chips" style="margin-bottom:12px">${['', ...days].map(d => `<button class="chip${d === filtreJour ? ' on' : ''}" data-d="${d}">${d ? jour(d).slice(0,3) + ' ' + fdShort(d) : 'Toute la caravane'}</button>`).join('')}</div>
    <div class="kpis">
      <div class="kpi main"><div class="v">${st.enfants.length}</div><div class="l">Enfants soignés</div></div>
      <div class="kpi"><div class="v">${st.actes.length}</div><div class="l">Actes réalisés</div></div>
      <div class="kpi"><div class="v">${st.soins.length}</div><div class="l">Soins (hors examen)</div></div>
      <div class="kpi"><div class="v">${st.dents}</div><div class="l">Dents soignées</div></div>
      <div class="kpi"><div class="v">${st.unites}</div><div class="l">Produits remis aux enfants</div></div>
      <div class="kpi"><div class="v">${st.distrib}</div><div class="l">Distributions groupées</div></div>
      <div class="kpi"><div class="v">${santeE.length}</div><div class="l">Enfants avec problème de santé</div></div>
      <div class="kpi"><div class="v">${ageMoy ? ageMoy.toFixed(1).replace('.', ',') : '–'}</div><div class="l">Âge moyen (ans)</div></div>
    </div>
    <button class="btn ghost block" id="share-sum" style="margin:6px 0 4px">Partager le résumé (WhatsApp…)</button>
    <h3>Actes par nature</h3><div class="card">${bars(countBy(st.actes, a => a.nature), st.actes.length)}</div>
    <h3>Par type d'acte</h3><div class="card">${bars(countBy(st.actes, a => typeActe(a.nature) || 'Autre'), st.actes.length)}</div>
    <h3>Par spécialité</h3><div class="card">${bars(countBy(st.actes, a => a.specialite), st.actes.length)}</div>
    <h3>Enfants soignés par lieu</h3><div class="card">${bars(countBy(st.enfants, e => lieuNom(e.lieu)))}</div>
    <h3>Produits remis par catégorie</h3><div class="card">${bars(sumBy(st.remises, r => prod(r.produit).cat, r => +r.qte || 1), st.unites)}</div>
    <h3>État de santé (enfants soignés)</h3><div class="card">
      <div class="sub" style="margin-bottom:4px">Maladies chroniques</div>${bars(countBy(st.enfants, e => e.maladie !== 'Aucune' && e.maladie))}
      <div class="sub" style="margin:10px 0 4px">Handicaps / déficiences</div>${bars(countBy(st.enfants, e => e.handicap !== 'Aucun' && e.handicap))}
      <div class="sub" style="margin:10px 0 4px">Allergies</div>${bars(countBy(st.enfants, e => e.allergie !== 'Aucune' && e.allergie))}</div>
    ${filtreJour ? '' : `<h3>Par journée</h3><div class="card scroll"><table class="tbl"><tr><th>Jour</th><th>Lieu</th><th class="r">Enfants</th><th class="r">Actes</th></tr>
      ${days.map(d => { const s = stats(d); const pl = S.planning.find(p => p.date === d); return `<tr><td>${jour(d).slice(0,3)} ${fdShort(d)}</td><td>${esc(pl && pl.lieu ? lieuNom(pl.lieu) : '')}</td><td class="r">${s.enfants.length}</td><td class="r">${s.actes.length}</td></tr>`; }).join('') || '<tr><td colspan="4" class="empty">Aucune journée</td></tr>'}</table></div>`}`;
  v.querySelectorAll('.chip').forEach(c => c.onclick = () => { filtreJour = c.dataset.d; render(); });
  v.querySelector('#share-sum').onclick = () => shareText(resume(st));
}
function resume(st){
  const lines = [`${S.caravane.association ? S.caravane.association + ' — ' : ''}${S.caravane.nom || 'Caravane dentaire'}${filtreJour ? ' — ' + jour(filtreJour) + ' ' + fd(filtreJour) : ''}`,
    `Enfants soignés : ${st.enfants.length}`, `Actes réalisés : ${st.actes.length} (dont ${st.soins.length} soins)`, `Dents soignées : ${st.dents}`,
    `Produits remis : ${st.unites}`, ''];
  countBy(st.actes, a => a.nature).forEach(([k, n]) => lines.push(`• ${k} : ${n}`));
  return lines.join('\n');
}
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
async function shareText(text){
  if (NATIVE){ try{ await window.Capacitor.Plugins.Share.share({ text }); return; }catch(e){} }
  try{ if (navigator.share){ await navigator.share({ text }); return; } }catch(e){ if (e && e.name === 'AbortError') return; }
  try{ await navigator.clipboard.writeText(text); toast('Résumé copié. Collez-le dans WhatsApp.'); }
  catch(e){ openSheet('Résumé', `<textarea style="min-height:240px">${esc(text)}</textarea><p class="note">Sélectionnez le texte et copiez-le.</p>`); }
}

/* ---------- Enfants ---------- */
function viewEnfants(v){
  const q = recherche.trim().toLowerCase();
  const list = S.enfants.filter(e => (!filtreLieu || e.lieu === filtreLieu) && (!q || e.nom.toLowerCase().includes(q) || e.ref.includes(q)))
    .sort((a, b) => (a.lieu + a.ref).localeCompare(b.lieu + b.ref));
  v.innerHTML = `<div class="search"><input id="q" type="search" placeholder="Rechercher un nom ou une REF" value="${esc(recherche)}" aria-label="Rechercher">
    <select id="fl" style="max-width:40%" aria-label="Lieu">${opts([['', 'Tous les lieux'], ...S.lieux.map(l => [l.code, l.code + ' ' + (l.nom || '')])], filtreLieu, false)}</select></div>
    <div class="sub" style="margin-bottom:8px">${list.length} enfant${list.length > 1 ? 's' : ''}</div>
    <div class="list">${list.map(e => { const n = S.actes.filter(a => a.ref === e.ref).length, h = sante(e);
      return `<div class="item" data-ref="${esc(e.ref)}"><div class="ref">${esc(e.ref)}</div><div class="grow"><div><b>${esc(e.nom)}</b></div>
      <div class="sub">${e.annee ? age(e) + ' ans · ' : ''}${esc(lieuNom(e.lieu))}</div>${h.length ? `<div style="margin-top:4px"><span class="pill alert">${esc(h.join(' · '))}</span></div>` : ''}</div>
      <span class="pill${n ? ' ok' : ''}">${n} acte${n > 1 ? 's' : ''}</span></div>`; }).join('') || '<div class="empty">Aucun enfant. Appuyez sur « + Enfant » pour commencer.</div>'}</div>
    <button class="btn fab" id="add">+ Enfant</button>`;
  const qi = v.querySelector('#q');
  qi.oninput = () => { recherche = qi.value; const pos = qi.selectionStart; render(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); };
  v.querySelector('#fl').onchange = e => { filtreLieu = e.target.value; render(); };
  v.querySelectorAll('.item').forEach(i => i.onclick = () => enfantDetail(i.dataset.ref));
  v.querySelector('#add').onclick = () => enfantForm();
}
function enfantForm(e){
  const isNew = !e; e = e || { lieu: filtreLieu || (S.lieux[0] && S.lieux[0].code) || '01' };
  if (!S.lieux.length){ toast('Ajoutez d\'abord un lieu dans « Plus » → Lieux.'); return; }
  openSheet(isNew ? 'Nouvel enfant' : 'Modifier ' + e.ref, `<form id="fe">
    <div class="two">${sel('lieu', 'Lieu', S.lieux.map(l => [l.code, l.code + ' ' + (l.nom || '')]), e.lieu, false)}${field('ref', 'REF', e.ref || nextRef(e.lieu))}</div>
    ${field('nom', 'Nom et prénom', e.nom, 'text', 'required autocomplete="off" autocapitalize="characters"')}
    <div class="two">${field('annee', 'Année de naissance', e.annee, 'number', 'inputmode="numeric" min="1990" max="2030"')}${sel('sexe', 'Sexe', SEXES, e.sexe, false)}</div>
    <h3>État général</h3>
    ${sel('maladie', 'Maladie chronique', MALADIES, e.maladie || 'Aucune', false)}
    ${sel('handicap', 'Handicap / déficience', HANDICAPS, e.handicap || 'Aucun', false)}
    ${sel('allergie', 'Allergie', ALLERGIES, e.allergie || 'Aucune', false)}
    ${field('allergiePrecision', "Préciser l'allergie (médicament, aliment…)", e.allergiePrecision)}
    ${area('obs', 'Observation', e.obs)}
    <button class="btn block" type="submit">${isNew ? 'Enregistrer et ajouter un acte' : 'Enregistrer'}</button></form>`, body => {
    const f = body.querySelector('form'), refIn = f.elements.ref;
    f.elements.lieu.onchange = () => { if (isNew) refIn.value = nextRef(f.elements.lieu.value); };
    f.onsubmit = ev => {
      ev.preventDefault(); const d = formData(f); d.nom = d.nom.trim().toUpperCase(); d.ref = d.ref.trim();
      if (!/^\d{3}\/\d{2}$/.test(d.ref)){ toast('REF au format 001/01'); return; }
      const clash = S.enfants.find(x => x.ref === d.ref && x.id !== e.id);
      if (clash){ toast('Cette REF existe déjà (' + clash.nom + ').'); return; }
      if (isNew){ const n = { id: uid(), ...d }; S.enfants.push(n); save(); closeSheet(); enfantDetail(n.ref, true); }
      else { const old = e.ref; Object.assign(e, d);
        if (old !== d.ref){ S.actes.forEach(a => { if (a.ref === old) a.ref = d.ref; }); S.remises.forEach(r => { if (r.ref === old) r.ref = d.ref; }); }
        save(); closeSheet(); closeSheet(); enfantDetail(e.ref); }
    };
  });
}
function enfantDetail(ref, openActe){
  const e = enfantByRef(ref); if (!e) return;
  const h = sante(e);
  const actes = S.actes.filter(a => a.ref === ref), rem = S.remises.filter(r => r.ref === ref);
  openSheet(e.ref + ' · ' + e.nom, `
    ${h.length ? `<div class="banner">⚠ ${esc(h.join(' · '))}</div>` : ''}
    <div class="card"><div class="sub">${[e.annee ? age(e) + ' ans' : '', e.sexe, lieuNom(e.lieu)].filter(Boolean).map(esc).join(' · ')}</div>${e.obs ? `<div style="margin-top:6px">${esc(e.obs)}</div>` : ''}</div>
    <div class="two" style="margin-bottom:6px"><button class="btn" id="a1">+ Acte</button><button class="btn" id="a2">+ Produit remis</button></div>
    <h3>Actes (${actes.length})</h3><div class="card" id="la">${actes.map(a => `<div class="act" data-id="${a.id}"><div><b>${esc(a.nature)}</b>${a.dent ? ' · dent ' + esc(a.dent) : ''}<div class="sub">${fd(a.date)}${a.specialite ? ' · ' + esc(a.specialite) : ''}${a.obs ? ' · ' + esc(a.obs) : ''}</div></div><button class="btn ghost small" data-del="${a.id}" aria-label="Supprimer">×</button></div>`).join('') || '<div class="empty">Aucun acte.</div>'}</div>
    <h3>Produits remis (${rem.length})</h3><div class="card" id="lr">${rem.map(r => `<div class="act"><div><b>${esc(r.produit)}</b> × ${r.qte || 1}<div class="sub">${fd(r.date)} · ${esc(prod(r.produit).cat)}</div></div><button class="btn ghost small" data-delr="${r.id}" aria-label="Supprimer">×</button></div>`).join('') || '<div class="empty">Aucun produit remis.</div>'}</div>
    <div class="two" style="margin-top:10px"><button class="btn ghost" id="ed">Modifier la fiche</button><button class="btn danger" id="dl">Supprimer l'enfant</button></div><div id="cf"></div>`, body => {
    body.querySelector('#a1').onclick = () => acteForm(e);
    body.querySelector('#a2').onclick = () => remiseForm(e);
    body.querySelector('#ed').onclick = () => enfantForm(e);
    body.querySelectorAll('[data-del]').forEach(b => b.onclick = () => confirmInline(b.closest('.act'), 'Supprimer cet acte ?', () => { S.actes = S.actes.filter(a => a.id !== b.dataset.del); save(); closeSheet(); enfantDetail(ref); }));
    body.querySelectorAll('[data-delr]').forEach(b => b.onclick = () => confirmInline(b.closest('.act'), 'Supprimer ?', () => { S.remises = S.remises.filter(r => r.id !== b.dataset.delr); save(); closeSheet(); enfantDetail(ref); }));
    body.querySelector('#dl').onclick = () => confirmInline(body.querySelector('#cf'), `Supprimer ${e.nom} et ses ${actes.length} actes ?`, () => {
      S.enfants = S.enfants.filter(x => x.id !== e.id); S.actes = S.actes.filter(a => a.ref !== ref); S.remises = S.remises.filter(r => r.ref !== ref); save(); closeAll(); });
  });
  if (openActe) acteForm(e);
}
let lastDate = '';
const defDate = () => lastDate || todayISO();
function acteForm(e){
  const h = sante(e);
  openSheet('Acte · ' + e.nom, `${h.length ? `<div class="banner">⚠ ${esc(h.join(' · '))}</div>` : ''}<form>
    <div class="two">${field('date', 'Date', defDate(), 'date', 'required')}${field('dent', 'Dent', '', 'text', 'inputmode="numeric" placeholder="ex. 54"')}</div>
    ${sel('nature', "Nature de l'acte", S.actesListe.map(a => a.nom), '', true, 'required')}
    ${sel('specialite', 'Spécialité', SPECS, '')}
    ${field('obs', 'Observation', '')}
    <div class="two"><button class="btn" type="submit" value="close">Enregistrer</button><button class="btn ghost" type="submit" value="again">Enregistrer + autre acte</button></div></form>`, body => {
    const f = body.querySelector('form');
    f.onsubmit = ev => { ev.preventDefault(); const d = formData(f); if (!d.nature){ toast("Choisissez la nature de l'acte."); return; }
      lastDate = d.date; S.actes.push({ id: uid(), ref: e.ref, ...d }); save();
      const again = ev.submitter && ev.submitter.value === 'again';
      closeSheet(); closeSheet(); enfantDetail(e.ref); if (again) acteForm(e); toast('Acte enregistré');
    };
  });
}
function remiseForm(e){
  const st = Object.fromEntries(stock().map(r => [r.nom, r]));
  const avail = S.produits.slice().sort((a, b) => ((st[b.nom] || {}).reste > 0) - ((st[a.nom] || {}).reste > 0));
  openSheet('Produit remis · ' + e.nom, `${allergieMed(e) ? `<div class="banner">⚠ Allergie médicamenteuse${e.allergiePrecision ? ' : ' + esc(e.allergiePrecision) : ''}</div>` : (sante(e).length ? `<div class="banner">⚠ ${esc(sante(e).join(' · '))}</div>` : '')}<form>
    ${field('date', 'Date', defDate(), 'date', 'required')}
    ${sel('produit', 'Médicament / produit', avail.map(p => [p.nom, p.nom + ((st[p.nom] || {}).recu ? '  (stock : ' + st[p.nom].reste + ')' : '')]), '', true, 'required')}
    ${field('qte', 'Quantité', 1, 'number', 'inputmode="numeric" min="1"')}
    <button class="btn block" type="submit">Enregistrer</button></form>`, body => {
    const f = body.querySelector('form');
    f.onsubmit = ev => { ev.preventDefault(); const d = formData(f); if (!d.produit){ toast('Choisissez un produit.'); return; }
      lastDate = d.date; S.remises.push({ id: uid(), ref: e.ref, date: d.date, produit: d.produit, qte: +d.qte || 1 }); save();
      closeSheet(); closeSheet(); enfantDetail(e.ref); toast('Produit enregistré'); };
  });
}

/* ---------- Pharmacie ---------- */
function viewPharma(v){
  v.innerHTML = `<div class="seg">${[['stock','Stock'],['entrees','Entrées'],['distrib','Distributions']].map(([k, l]) => `<button data-k="${k}" class="${pharmaTab === k ? 'on' : ''}">${l}</button>`).join('')}</div><div id="pv"></div>`;
  v.querySelectorAll('.seg button').forEach(b => b.onclick = () => { pharmaTab = b.dataset.k; render(); });
  const pv = v.querySelector('#pv');
  if (pharmaTab === 'stock'){
    const rows = stock(); const actifs = rows.filter(r => r.recu || r.remis || r.distrib).sort((a, b) => a.cat.localeCompare(b.cat) || a.nom.localeCompare(b.nom));
    const val = rows.reduce((s, r) => s + r.valeur, 0);
    pv.innerHTML = `<div class="kpis"><div class="kpi"><div class="v">${actifs.length}</div><div class="l">Produits en mouvement</div></div><div class="kpi"><div class="v">${num(val)}</div><div class="l">Valeur reçue (DH)</div></div></div>
      <div class="list">${actifs.map(r => `<div class="item" style="cursor:default"><div class="grow"><b>${esc(r.nom)}</b><div class="sub">${esc(r.cat)} · reçu ${r.recu} · remis ${r.remis} · distribué ${r.distrib}${r.per ? ' · pér. ' + fd(r.per) : ''}</div>${r.alerte ? `<span class="pill ${r.alerte[0]}" style="margin-top:4px">${r.alerte[1]}</span>` : ''}</div><div style="text-align:right"><div style="font-size:22px;font-weight:750">${r.reste}</div><div class="sub">en stock</div></div></div>`).join('') || '<div class="empty">Aucun produit reçu.</div>'}</div>
      <button class="btn ghost block" id="np">+ Ajouter un produit à la liste</button>`;
    pv.querySelector('#np').onclick = produitForm;
  } else if (pharmaTab === 'entrees'){
    const tot = S.entrees.reduce((s, x) => s + (+x.qte || 0) * (+x.pu || 0), 0);
    pv.innerHTML = `<div class="sub" style="margin-bottom:8px">${S.entrees.length} ligne(s) · ${num(tot)} DH</div><div class="list">${S.entrees.slice().reverse().map(x => `<div class="item" data-id="${x.id}"><div class="grow"><b>${esc(x.produit)}</b> × ${x.qte}<div class="sub">${fd(x.date)} · ${esc(x.bl || '')} · lot ${esc(x.lot || '–')} · pér. ${fd(x.peremption) || '–'}</div><div class="sub">${esc(x.fournisseur || '')}</div></div></div>`).join('') || '<div class="empty">Aucune entrée.</div>'}</div>
      <button class="btn fab" id="ne">+ Entrée</button>`;
    pv.querySelectorAll('.item').forEach(i => i.onclick = () => entreeForm(S.entrees.find(x => x.id === i.dataset.id)));
    pv.querySelector('#ne').onclick = () => entreeForm();
  } else {
    pv.innerHTML = `<p class="note">Remises groupées, par exemple des brosses à dents pour une classe. Ce qui est remis à un enfant précis se note sur sa fiche.</p>
      <div class="list">${S.distributions.slice().reverse().map(x => `<div class="item" data-id="${x.id}"><div class="grow"><b>${esc(x.produit)}</b> × ${x.qte}<div class="sub">${fd(x.date)} · ${esc(lieuNom(x.lieu))}${x.beneficiaires ? ' · ' + esc(x.beneficiaires) : ''}</div></div></div>`).join('') || '<div class="empty">Aucune distribution.</div>'}</div>
      <button class="btn fab" id="nd">+ Distribution</button>`;
    pv.querySelectorAll('.item').forEach(i => i.onclick = () => distribForm(S.distributions.find(x => x.id === i.dataset.id)));
    pv.querySelector('#nd').onclick = () => distribForm();
  }
}
function produitForm(){
  openSheet('Nouveau produit', `<form>${field('nom', 'Nom du produit', '', 'text', 'required autocapitalize="characters"')}${sel('cat', 'Catégorie', CATS, '', false)}${sel('type', 'Type', ['Médicament','Parapharmacie'], 'Médicament', false)}<button class="btn block">Ajouter</button></form>`, b => {
    const f = b.querySelector('form'); f.onsubmit = ev => { ev.preventDefault(); const d = formData(f); d.nom = d.nom.trim().toUpperCase();
      if (S.produits.some(p => p.nom === d.nom)){ toast('Ce produit existe déjà.'); return; } S.produits.push(d); save(); closeSheet(); toast('Produit ajouté'); };
  });
}
function crudSheet(title, x, html, coll, build, done){
  const isNew = !x;
  openSheet(title, `<form>${html}<button class="btn block" type="submit">Enregistrer</button>${isNew ? '' : '<button class="btn danger block" type="button" id="del" style="margin-top:8px">Supprimer</button><div id="cf"></div>'}</form>`, b => {
    const f = b.querySelector('form');
    f.onsubmit = ev => { ev.preventDefault(); const d = build(formData(f)); if (!d) return;
      if (isNew) S[coll].push({ id: uid(), ...d }); else Object.assign(x, d); save(); closeSheet(); if (done) done(); };
    if (!isNew) b.querySelector('#del').onclick = () => confirmInline(b.querySelector('#cf'), 'Supprimer définitivement ?', () => { S[coll] = S[coll].filter(y => y.id !== x.id); save(); closeSheet(); if (done) done(); });
  });
}
function entreeForm(x){
  const e = x || { date: todayISO() };
  crudSheet(x ? 'Modifier l\'entrée' : 'Nouvelle entrée', x, `
    ${sel('produit', 'Produit', S.produits.map(p => p.nom), e.produit, true, 'required')}
    <div class="two">${field('qte', 'Quantité', e.qte, 'number', 'required inputmode="numeric" min="1"')}${field('pu', 'Prix unitaire (DH)', e.pu, 'number', 'step="0.01" inputmode="decimal"')}</div>
    <div class="two">${field('date', 'Date de réception', e.date, 'date')}${field('peremption', 'Péremption', e.peremption, 'date')}</div>
    <div class="two">${field('lot', 'Lot', e.lot)}${field('bl', 'N° bon de livraison', e.bl)}</div>
    ${field('fournisseur', 'Fournisseur / donateur', e.fournisseur)}`, 'entrees', d => { if (!d.produit){ toast('Choisissez un produit.'); return null; } d.qte = +d.qte || 0; d.pu = +d.pu || 0; return d; });
}
function distribForm(x){
  const e = x || { date: defDate(), lieu: (S.lieux[0] || {}).code };
  crudSheet(x ? 'Modifier la distribution' : 'Nouvelle distribution', x, `
    ${sel('produit', 'Produit', S.produits.slice().sort((a, b) => (b.type === 'Parapharmacie') - (a.type === 'Parapharmacie')).map(p => p.nom), e.produit, true, 'required')}
    <div class="two">${field('qte', 'Quantité', e.qte, 'number', 'required inputmode="numeric" min="1"')}${field('date', 'Date', e.date, 'date')}</div>
    ${sel('lieu', 'Lieu', S.lieux.map(l => [l.code, l.code + ' ' + (l.nom || '')]), e.lieu)}
    ${field('beneficiaires', 'Bénéficiaires (classe, groupe…)', e.beneficiaires)}`, 'distributions', d => { if (!d.produit){ toast('Choisissez un produit.'); return null; } d.qte = +d.qte || 0; return d; });
}

/* ---------- Équipe ---------- */
function viewEquipe(v){
  const days = S.planning.map(p => p.date).filter(Boolean).sort();
  v.innerHTML = `<div class="sub" style="margin-bottom:8px">${S.participants.length} participant(s) · ${S.participants.filter(p => p.fonction === 'Dentiste').length} dentiste(s)</div>
    <div class="list">${S.participants.map(p => `<div class="item" data-id="${p.id}"><div class="grow"><b>${esc(p.nom)}</b><div class="sub">${esc(p.fonction || '')}${p.specialite ? ' · ' + esc(p.specialite) : ''}</div>
      ${p.tel ? `<div style="margin-top:3px"><a class="tel" href="tel:${esc(p.tel.replace(/\s/g, ''))}" onclick="event.stopPropagation()">${esc(p.tel)}</a></div>` : ''}</div>
      <span class="pill">${(p.presences || []).length}/${days.length} j</span></div>`).join('') || '<div class="empty">Aucun participant.</div>'}</div>
    <button class="btn fab" id="np">+ Participant</button>`;
  v.querySelectorAll('.item').forEach(i => i.onclick = () => participantForm(S.participants.find(p => p.id === i.dataset.id)));
  v.querySelector('#np').onclick = () => participantForm();
}
function participantForm(x){
  const p = x || { presences: [] }; const days = S.planning.map(d => d.date).filter(Boolean).sort();
  crudSheet(x ? p.nom : 'Nouveau participant', x, `
    ${field('nom', 'Nom et prénom', p.nom, 'text', 'required')}
    ${sel('fonction', 'Fonction', FONCTIONS, p.fonction)}
    <div class="two">${sel('specialite', 'Spécialité', SPECS, p.specialite)}${field('tel', 'Téléphone', p.tel, 'tel', 'placeholder="06 XX XX XX XX"')}</div>
    ${field('email', 'E-mail', p.email, 'email')}
    <label class="f"><span>Présence</span><div class="chips">${days.map(d => `<label class="chip${(p.presences || []).includes(d) ? ' on' : ''}"><input type="checkbox" name="pres_${d}" ${(p.presences || []).includes(d) ? 'checked' : ''} hidden>${jour(d).slice(0,3)} ${fdShort(d)}</label>`).join('') || '<span class="note">Ajoutez les journées dans « Plus » → Planning.</span>'}</div></label>`,
    'participants', d => { const pres = Object.keys(d).filter(k => k.startsWith('pres_')).map(k => k.slice(5)); for (const k of Object.keys(d)) if (k.startsWith('pres_')) delete d[k];
      d.presences = pres; return d; });
  document.querySelectorAll('.sheet .chip input').forEach(i => i.onchange = () => i.parentElement.classList.toggle('on', i.checked));
}

/* ---------- Plus ---------- */
function viewPlus(v){
  const items = [['caravane','La caravane', S.caravane.type || ''],['lieux','Lieux (écoles, centres)', S.lieux.length + ' lieu(x)'],['planning','Planning', S.planning.length + ' journée(s)'],
    ['actes','Liste des actes', S.actesListe.length + ' actes'],['export','Exporter en Excel', 'Bilan complet à envoyer'],['backup','Sauvegarde et fusion', 'Copier les données vers un autre téléphone'],
    ['reglages','Ce téléphone', S.reglages.poste || 'Nom du poste, numérotation des REF'],['nouvelle','Nouvelle caravane', 'Vider les enfants et les actes'],['aide','Aide et confidentialité', 'Version ' + VERSION]];
  v.innerHTML = `<div class="list menu">${items.map(([k, l, s]) => `<div class="item" data-k="${k}"><div class="grow"><b>${l}</b><div class="sub">${esc(s)}</div></div><span aria-hidden="true">›</span></div>`).join('')}</div>`;
  v.querySelectorAll('.item').forEach(i => i.onclick = () => ({ caravane: caravaneForm, lieux: lieuxView, planning: planningView, actes: actesListeView, export: exportExcel, backup: backupView, reglages: reglagesForm, nouvelle: nouvelleCaravane, aide: aideView })[i.dataset.k]());
}
function caravaneForm(){
  const c = S.caravane;
  openSheet('La caravane', `<form>${field('nom', 'Nom de la caravane', c.nom)}${sel('type', 'Type', CTYPES, c.type, false)}${field('ville', 'Ville / région', c.ville)}
    <div class="two">${field('debut', 'Début', c.debut, 'date')}${field('fin', 'Fin', c.fin, 'date')}</div>${field('association', 'Association', c.association)}
    <div class="two">${field('responsable', 'Responsable', c.responsable)}${field('tel', 'Téléphone', c.tel, 'tel')}</div><button class="btn block">Enregistrer</button></form>`, b => {
    const f = b.querySelector('form'); f.onsubmit = ev => { ev.preventDefault(); Object.assign(S.caravane, formData(f)); save(); closeSheet(); toast('Enregistré'); };
  });
}
function lieuxView(){
  openSheet('Lieux', `<p class="note">Le code (01, 02…) est le numéro après la barre dans la REF de l'enfant.</p><div class="list">${S.lieux.map((l, i) => `<div class="item" data-i="${i}"><div class="ref">${esc(l.code)}</div><div class="grow"><b>${esc(l.nom || 'Sans nom')}</b><div class="sub">${esc([l.type, l.ville, l.contact, l.tel].filter(Boolean).join(' · '))}</div></div></div>`).join('')}</div><button class="btn block" id="nl">+ Lieu</button>`, b => {
    b.querySelectorAll('.item').forEach(i => i.onclick = () => lieuForm(S.lieux[+i.dataset.i]));
    b.querySelector('#nl').onclick = () => lieuForm();
  });
}
function lieuForm(l){
  const isNew = !l; const next = String(Math.max(0, ...S.lieux.map(x => +x.code || 0)) + 1).padStart(2, '0');
  l = l || { code: next, type: 'École' };
  openSheet(isNew ? 'Nouveau lieu' : 'Lieu ' + l.code, `<form><div class="two">${field('code', 'Code', l.code, 'text', 'required inputmode="numeric" maxlength="2"' + (isNew ? '' : ' readonly'))}${sel('type', 'Type', LTYPES, l.type, false)}</div>
    ${field('nom', 'Nom du lieu', l.nom, 'text', 'required')}${field('ville', 'Ville', l.ville)}<div class="two">${field('contact', 'Contact sur place', l.contact)}${field('tel', 'Téléphone', l.tel, 'tel')}</div><button class="btn block">Enregistrer</button></form>`, b => {
    const f = b.querySelector('form'); f.onsubmit = ev => { ev.preventDefault(); const d = formData(f); d.code = d.code.padStart(2, '0');
      if (isNew && S.lieux.some(x => x.code === d.code)){ toast('Ce code existe déjà.'); return; }
      if (isNew) S.lieux.push(d); else Object.assign(l, d); save(); closeSheet(); closeSheet(); lieuxView(); };
  });
}
function planningView(){
  const pl = S.planning.slice().sort((a, b) => a.date.localeCompare(b.date));
  openSheet('Planning', `<div class="list">${pl.map(p => `<div class="item" data-id="${p.id}"><div class="grow"><b>${jour(p.date)} ${fd(p.date)}</b><div class="sub">${esc([p.lieu ? lieuNom(p.lieu) : 'Lieu à préciser', p.horaires, p.resp].filter(Boolean).join(' · '))}</div></div><span class="pill">${stats(p.date).enfants.length} enf.</span></div>`).join('') || '<div class="empty">Aucune journée.</div>'}</div><button class="btn block" id="np">+ Journée / séance</button>`, b => {
    b.querySelectorAll('.item').forEach(i => i.onclick = () => planForm(S.planning.find(p => p.id === i.dataset.id)));
    b.querySelector('#np').onclick = () => planForm();
  });
}
function planForm(x){
  const p = x || { date: todayISO() };
  crudSheet(x ? jour(p.date) + ' ' + fd(p.date) : 'Nouvelle journée', x, `${field('date', 'Date', p.date, 'date', 'required')}${sel('lieu', 'Lieu', S.lieux.map(l => [l.code, l.code + ' ' + (l.nom || '')]), p.lieu)}
    ${field('horaires', 'Horaires', p.horaires, 'text', 'placeholder="9h – 13h"')}${field('resp', 'Responsable sur place', p.resp)}`, 'planning', d => d, () => { closeSheet(); planningView(); });
}
function actesListeView(){
  openSheet('Liste des actes', `<div class="card">${S.actesListe.map(a => `<div class="act"><span>${esc(a.nom)}</span><span class="sub">${esc(a.type)}</span></div>`).join('')}</div>
    <form>${field('nom', 'Nouvel acte', '', 'text', 'required autocapitalize="characters"')}${sel('type', 'Type', [...new Set(ACTES.map(a => a[1]))], 'Soins conservateurs', false)}<button class="btn block">Ajouter</button></form>`, b => {
    const f = b.querySelector('form'); f.onsubmit = ev => { ev.preventDefault(); const d = formData(f); d.nom = d.nom.trim().toUpperCase();
      if (S.actesListe.some(a => a.nom === d.nom)){ toast('Cet acte existe déjà.'); return; } S.actesListe.push(d); save(); closeSheet(); actesListeView(); };
  });
}
function reglagesForm(){
  openSheet('Ce téléphone', `<form>${field('poste', 'Nom du poste (ex. Poste 1, Dr Znaidi)', S.reglages.poste)}
    ${field('refDepart', 'Premier numéro de REF sur ce téléphone', S.reglages.refDepart, 'number', 'min="1" max="999" inputmode="numeric"')}
    <p class="note">Si plusieurs téléphones saisissent des enfants du même lieu, donnez à chacun une plage différente (ex. téléphone 1 : 1, téléphone 2 : 301, téléphone 3 : 601) pour éviter deux fois la même REF.</p>
    <button class="btn block">Enregistrer</button></form>`, b => {
    const f = b.querySelector('form'); f.onsubmit = ev => { ev.preventDefault(); const d = formData(f); S.reglages.poste = d.poste; S.reglages.refDepart = Math.max(1, +d.refDepart || 1); save(); closeSheet(); toast('Enregistré'); };
  });
}
function nouvelleCaravane(){
  openSheet('Nouvelle caravane', `<p>Avant de commencer une nouvelle caravane, exportez le bilan en Excel et faites une sauvegarde.</p>
    <p class="note">Seront vidés : enfants, actes, produits remis, distributions, planning et présences. Seront gardés : les lieux, l'équipe, la liste des produits, les actes et le stock (les entrées et ce qui a été remis restent comptés).</p>
    <button class="btn ghost block" id="ex">Exporter le bilan en Excel d'abord</button><div style="height:10px"></div><button class="btn danger block" id="go">Vider et commencer une nouvelle caravane</button><div id="cf"></div>`, b => {
    b.querySelector('#ex').onclick = exportExcel;
    b.querySelector('#go').onclick = () => confirmInline(b.querySelector('#cf'), 'Confirmer : les enfants et actes de cette caravane seront effacés de ce téléphone.', () => {
      const st = stock();
      S.entrees = st.filter(r => r.reste > 0).map(r => ({ id: uid(), date: todayISO(), bl: 'Report de stock', fournisseur: 'Stock caravane précédente', produit: r.nom, lot: '', peremption: r.per, qte: r.reste, pu: 0 }));
      Object.assign(S, { enfants: [], actes: [], remises: [], distributions: [], planning: [] });
      S.participants.forEach(p => p.presences = []);
      S.caravane = { nom: '', type: CTYPES[0], ville: '', debut: '', fin: '', association: S.caravane.association, responsable: '', tel: '' };
      save(); closeAll(); caravaneForm(); toast('Nouvelle caravane prête. Le stock restant a été reporté.');
    });
  });
}
function aideView(){
  openSheet('Aide', `<div class="card"><b>Saisie</b><p class="note">Enfants → « + Enfant » : la REF est proposée automatiquement (001/01, 002/01…). Après l'enregistrement, ajoutez les actes et les produits remis sur la fiche de l'enfant. Les alertes de santé s'affichent en rouge.</p></div>
    <div class="card"><b>Hors connexion</b><p class="note">L'application fonctionne sans internet. Les données sont enregistrées sur ce téléphone uniquement.</p></div>
    <div class="card"><b>Plusieurs téléphones</b><p class="note">Chaque téléphone a ses propres données. En fin de journée, chaque membre fait « Sauvegarde et fusion » → « Envoyer ma sauvegarde » (WhatsApp), et la coordinatrice l'importe sur son téléphone avec « Importer une sauvegarde ». Les données sont additionnées sans doublons.</p></div>
    <div class="card"><b>Sécurité des données</b><p class="note">Les fiches contiennent des informations de santé d'enfants. Verrouillez votre téléphone, ne partagez les exports et sauvegardes qu'au sein de l'équipe, et faites une sauvegarde chaque jour : si l'application est désinstallée ou les données du navigateur effacées, les données de ce téléphone sont perdues.</p></div>`);
}

/* ---------- Export Excel / sauvegarde ---------- */
function workbook(){
  const wb = XLSX.utils.book_new();
  const add = (name, rows) => { const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ '': 'Aucune donnée' }]);
    const keys = Object.keys(rows[0] || { '': '' }); ws['!cols'] = keys.map(k => ({ wch: Math.min(45, Math.max(10, k.length + 2, ...rows.map(r => String(r[k] ?? '').length + 1))) })); XLSX.utils.book_append_sheet(wb, ws, name); };
  const st = stats('');
  const bil = [{ Indicateur: 'Association', Valeur: S.caravane.association || 'Enfance Sourire' }, { Indicateur: 'Caravane', Valeur: S.caravane.nom }, { Indicateur: 'Type', Valeur: S.caravane.type }, { Indicateur: 'Période', Valeur: fd(S.caravane.debut) + ' – ' + fd(S.caravane.fin) },
    { Indicateur: 'Enfants enregistrés', Valeur: S.enfants.length }, { Indicateur: 'Enfants soignés', Valeur: st.enfants.length }, { Indicateur: 'Actes réalisés', Valeur: st.actes.length },
    { Indicateur: 'Soins (hors examen et orientation)', Valeur: st.soins.length }, { Indicateur: 'Dents soignées', Valeur: st.dents },
    { Indicateur: 'Produits remis aux enfants (unités)', Valeur: st.unites }, { Indicateur: 'Distributions groupées (unités)', Valeur: st.distrib },
    { Indicateur: 'Enfants avec problème de santé', Valeur: st.enfants.filter(e => sante(e).length).length }, { Indicateur: 'Participants', Valeur: S.participants.length }, { Indicateur: '', Valeur: '' },
    ...countBy(st.actes, a => a.nature).map(([k, n]) => ({ Indicateur: 'Acte : ' + k, Valeur: n })), { Indicateur: '', Valeur: '' },
    ...countBy(st.actes, a => typeActe(a.nature) || 'Autre').map(([k, n]) => ({ Indicateur: 'Type : ' + k, Valeur: n })), { Indicateur: '', Valeur: '' },
    ...countBy(st.actes, a => a.specialite).map(([k, n]) => ({ Indicateur: 'Spécialité : ' + k, Valeur: n })), { Indicateur: '', Valeur: '' },
    ...countBy(st.enfants, e => lieuNom(e.lieu)).map(([k, n]) => ({ Indicateur: 'Lieu : ' + k, Valeur: n })), { Indicateur: '', Valeur: '' },
    ...sumBy(st.remises, r => prod(r.produit).cat, r => +r.qte || 1).map(([k, n]) => ({ Indicateur: 'Produits remis : ' + k, Valeur: n }))];
  add('Bilan', bil);
  add('Par journée', [...new Set([...S.planning.map(p => p.date), ...S.actes.map(a => a.date)].filter(Boolean))].sort().map(d => { const s = stats(d), p = S.planning.find(x => x.date === d) || {};
    return { Date: fd(d), Jour: jour(d), Lieu: p.lieu ? lieuNom(p.lieu) : '', Horaires: p.horaires || '', Responsable: p.resp || '', 'Participants présents': S.participants.filter(x => (x.presences || []).includes(d)).length, 'Enfants soignés': s.enfants.length, Actes: s.actes.length }; }));
  add('Enfants', S.enfants.slice().sort((a, b) => (a.lieu + a.ref).localeCompare(b.lieu + b.ref)).map(e => ({ REF: e.ref, Lieu: lieuNom(e.lieu), 'Nom et prénom': e.nom, 'Année de naissance': e.annee ? +e.annee : '', Âge: age(e), Sexe: e.sexe || '',
    'Maladie chronique': e.maladie || '', 'Handicap / déficience': e.handicap || '', Allergie: e.allergie || '', 'Précision allergie': e.allergiePrecision || '',
    'Dents soignées': S.actes.filter(a => a.ref === e.ref && a.dent).length, "Nombre d'actes": S.actes.filter(a => a.ref === e.ref).length, Observation: e.obs || '' })));
  add('Actes', S.actes.slice().sort((a, b) => (a.date + a.ref).localeCompare(b.date + b.ref)).map(a => { const e = enfantByRef(a.ref) || {};
    return { REF: a.ref, 'Nom et prénom': e.nom || '', Âge: e.annee ? age(e) : '', Date: fd(a.date), Dent: a.dent || '', "Nature d'acte": a.nature, "Type d'acte": typeActe(a.nature), Spécialité: a.specialite || '', Observation: a.obs || '', 'État de santé': sante(e).join(' ; ') }; }));
  add('Produits remis', S.remises.map(r => { const e = enfantByRef(r.ref) || {}; return { REF: r.ref, 'Nom et prénom': e.nom || '', Date: fd(r.date), Produit: r.produit, Catégorie: prod(r.produit).cat, Quantité: +r.qte || 1, 'État de santé': sante(e).join(' ; ') }; }));
  add('Stock', stock().filter(r => r.recu || r.remis || r.distrib).map(r => ({ Produit: r.nom, Catégorie: r.cat, Type: r.type, Reçu: r.recu, 'Remis aux enfants': r.remis, 'Distributions groupées': r.distrib, 'Stock restant': r.reste, 'Péremption la plus proche': fd(r.per), Alerte: r.alerte ? r.alerte[1] : '', 'Valeur reçue (DH)': Math.round(r.valeur * 100) / 100 })));
  add('Entrées', S.entrees.map(x => ({ Date: fd(x.date), 'N° BL': x.bl || '', 'Fournisseur / donateur': x.fournisseur || '', Produit: x.produit, Lot: x.lot || '', Péremption: fd(x.peremption), Quantité: +x.qte || 0, 'Prix unitaire (DH)': +x.pu || 0, 'Montant (DH)': Math.round((+x.qte || 0) * (+x.pu || 0) * 100) / 100 })));
  add('Distributions', S.distributions.map(x => ({ Date: fd(x.date), Lieu: lieuNom(x.lieu), Produit: x.produit, Catégorie: prod(x.produit).cat, Quantité: +x.qte || 0, Bénéficiaires: x.beneficiaires || '' })));
  add('Participants', S.participants.map(p => ({ 'Nom et prénom': p.nom, Fonction: p.fonction || '', Spécialité: p.specialite || '', Téléphone: p.tel || '', 'E-mail': p.email || '', 'Jours de présence': (p.presences || []).length, Présences: (p.presences || []).sort().map(fdShort).join(', ') })));
  add('Lieux', S.lieux.map(l => ({ Code: l.code, Nom: l.nom || '', Type: l.type || '', Ville: l.ville || '', Contact: l.contact || '', Téléphone: l.tel || '' })));
  return wb;
}
const slug = s => (s || 'caravane').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40);
async function shareOrDownload(blob, name){
  if (NATIVE){
    try{
      const { Filesystem, Share } = window.Capacitor.Plugins;
      const b64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(blob); });
      const w = await Filesystem.writeFile({ path: name, data: b64, directory: 'CACHE' });
      await Share.share({ title: name, url: w.uri, dialogTitle: 'Envoyer ' + name });
    }catch(e){ if (!/cancel/i.test(String(e && e.message))) toast("L'envoi a échoué : " + (e && e.message)); }
    return;
  }
  const file = new File([blob], name, { type: blob.type });
  try{ if (navigator.canShare && navigator.canShare({ files: [file] })){ await navigator.share({ files: [file], title: name }); return; } }catch(e){ if (e && e.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000); toast('Fichier téléchargé : ' + name);
}
function exportExcel(){
  try{
    const out = XLSX.write(workbook(), { bookType: 'xlsx', type: 'array' });
    shareOrDownload(new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `Bilan_${slug(S.caravane.nom)}_${todayISO()}.xlsx`);
  }catch(e){ toast("L'export a échoué : " + e.message); }
}
function backupView(){
  openSheet('Sauvegarde et fusion', `<div class="card"><b>Envoyer ma sauvegarde</b><p class="note">Crée un fichier avec toutes les données de ce téléphone, à envoyer à la coordinatrice ou à garder en sécurité. À faire chaque soir.</p><button class="btn block" id="bk">Envoyer ma sauvegarde</button></div>
    <div class="card"><b>Importer une sauvegarde</b><p class="note">Ajoute les données d'un autre téléphone à celles-ci, sans doublons. Rien n'est effacé.</p><label class="btn ghost block" for="imp">Choisir un fichier de sauvegarde</label><input type="file" id="imp" accept=".json,application/json" hidden><div id="res"></div></div>`, b => {
    b.querySelector('#bk').onclick = () => shareOrDownload(new Blob([JSON.stringify({ app: 'caravane-dentaire', exporte: new Date().toISOString(), poste: S.reglages.poste, data: S })], { type: 'application/json' }),
      `Sauvegarde_${slug(S.reglages.poste || 'telephone')}_${todayISO()}.json`);
    b.querySelector('#imp').onchange = async ev => {
      const f = ev.target.files[0]; if (!f) return;
      try{ const j = JSON.parse(await f.text()); const r = merge(j.data || j); save();
        b.querySelector('#res').innerHTML = `<p class="pill ok" style="margin-top:10px">Importé : ${r.added} élément(s) ajouté(s)</p>${r.conflicts.length ? `<div class="banner" style="margin-top:8px">${r.conflicts.length} REF en double avec un autre enfant : ${esc(r.conflicts.slice(0, 8).join(', '))}. Renommez l'une des deux fiches.</div>` : ''}`;
      }catch(e){ b.querySelector('#res').innerHTML = `<div class="banner" style="margin-top:8px">Ce fichier n'est pas une sauvegarde valide de l'application.</div>`; }
      ev.target.value = '';
    };
  });
}
function merge(d){
  let added = 0; const conflicts = [];
  for (const k of ['enfants','actes','remises','entrees','distributions','participants','planning']){
    const ids = new Set((S[k] || []).map(x => x.id));
    for (const x of (d[k] || [])){ if (!x.id || ids.has(x.id)) continue;
      if (k === 'enfants'){ const c = S.enfants.find(e => e.ref === x.ref); if (c && c.nom !== x.nom) conflicts.push(x.ref + ' (' + x.nom + ' / ' + c.nom + ')'); }
      if (k === 'planning' && S.planning.some(p => p.date === x.date && (p.lieu || '') === (x.lieu || ''))) continue;
      if (k === 'entrees' && x.bl && S.entrees.some(y => y.bl === x.bl && y.produit === x.produit && (y.lot || '') === (x.lot || ''))) continue;
      S[k].push(x); ids.add(x.id); added++; }
  }
  for (const l of (d.lieux || [])){ const ex = S.lieux.find(x => x.code === l.code); if (!ex){ S.lieux.push(l); added++; } else if (!ex.nom && l.nom) Object.assign(ex, l); }
  for (const p of (d.produits || [])) if (!S.produits.some(x => x.nom === p.nom)){ S.produits.push(p); added++; }
  for (const a of (d.actesListe || [])) if (!S.actesListe.some(x => x.nom === a.nom)){ S.actesListe.push(a); added++; }
  for (const p of S.participants){ const o = (d.participants || []).find(x => x.id === p.id); if (o) p.presences = [...new Set([...(p.presences || []), ...(o.presences || [])])]; }
  return { added, conflicts };
}

/* ---------- Démarrage ---------- */
load(); render();
if (!NATIVE && 'serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
