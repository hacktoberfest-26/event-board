import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCircleQuestion,
  faHashtag,
  faQrcode,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** FontAwesome icons for the service cards, keyed by their FontAwesome name. */
const ICONS: Record<string, IconDefinition> = {
  wifi: faWifi,
  github: faGithub,
  "circle-question": faCircleQuestion,
  qrcode: faQrcode,
  hashtag: faHashtag,
};

interface IconProps {
  name: string;
}

export default function Icon({ name }: IconProps) {
  const icon = ICONS[name];
  if (!icon) return <span>{name || "?"}</span>;

  return <FontAwesomeIcon icon={icon} className="h-[2.8rem] w-auto" />;
}
