import {BACKEND_IP} from '../api/ApiCalls';

export function getUrl(path) {
  return BACKEND_IP+"/"+path;
}