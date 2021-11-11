interface apiProps {
  payload: string;
  q?: string;
  country?: string;
}

export const API_URL = ({ payload, q, country }: apiProps) => {
  const baseURL: string = "https://newsapi.org";
  const version: string = "v2";

  const getQ: string = q ? `&q=${q}` : "";
  const getCountry: string = country ? `&country=${country}` : "";

  return `${baseURL}/${version}/${payload}?apiKey=${
    process.env.NEXT_PUBLIC_API_KEY
  }${getQ + getCountry}`;
};

export function formatDate(value: string) {
  const date: any = value === undefined ? null : new Date(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(date);
}
