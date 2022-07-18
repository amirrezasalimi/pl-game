import { API_URL } from "../../constants/config";

const assetUrl = (mod_name: string, path: string) => {
    return `${API_URL}/mod/${mod_name}/assets/${path}`;
}
export default assetUrl;