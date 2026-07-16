export const site = {
  name: "VigApp",
  url: "https://vigapp.com.br",
  logo: "/media/logo-vigapp.png",
  email: "contato@vigapp.com.br",
  phones: [
    { label: "+55 19 97125-3411", tel: "+5519971253411" },
    { label: "+55 19 99659-3967", tel: "+5519996593967" },
  ],
} as const;

export function whatsappUrl(tel: string, message: string) {
  return `https://wa.me/${tel.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
