export default function formatDate(value?: string) {
  const date: any = value === undefined ? null : new Date(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}
