export function slugify(s: string) {
  s = s.replace(/^\s+|\s+$/g, ''); // trim
  s = s.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  
  for (var i=0, l=from.length ; i<l ; i++) {
    s = s.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  s = s
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return s;
}
