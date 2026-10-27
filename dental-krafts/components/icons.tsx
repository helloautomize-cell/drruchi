/** Inline SVG icon: <Icon name="tooth" /> renders <svg class="ic"><use href="#i-tooth"/></svg> */
export function Icon({ name, cls = "ic", label }: { name: string; cls?: string; label?: string }) {
  return (
    <svg className={cls} aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function DkIcon({ name, cls = "" }: { name: string; cls?: string }) {
  return (
    <span className={`dk-ic ${cls}`}>
      <svg aria-hidden="true"><use href={`#dk-${name}`} /></svg>
    </span>
  );
}
