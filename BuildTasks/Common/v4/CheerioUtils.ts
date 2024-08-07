import * as cheerio from "cheerio";

export type ElementValue = string | number | boolean | null;

export const inputsToJson = ($: cheerio.CheerioAPI) => {
  const inputs = $("input")
    .toArray()
    .reduce((p, c, i) => {
      let k = c.attribs.name || c.attribs.id || `${i}`;
      let v: ElementValue = c.attribs.value;

      switch (c.attribs.type) {
        case "checkbox":
          v = c.attribs.checked != "";
          break;
        case "radio":
          v = c.attribs.checked != "" ? c.attribs.value : null;
          break;
        case "hidden":
          k = `_${k}`;
          break;
        case "button":
        case "submit":
          return p;
        default:
      }

      p[k] = v;
      return p;
    }, {} as Record<string, ElementValue>);

  const selects = $("select")
    .toArray()
    .reduce((p, c, i) => {
      const selected = $('option[selected="selected"]', c).toArray()[0];
      let k = c.attribs.name || c.attribs.id || `${i}`;
      let v: ElementValue = null;
      let label = $(`label[for="${k}"]`).text();

      if (selected) v = selected.attribs.value;

      if (label) p[`__${label}`] = v;
      p[k] = v;

      return p;
    }, {} as Record<string, ElementValue>);

  return {
    ...inputs,
    ...selects,
  };
};
