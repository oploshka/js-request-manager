
// TODO: fix
// import RequestManager from 'js-request-manager';
import {RequestManager} from '@service/RequestManagerSrc';

// RequestSchema
import RequestSchema  from './RequestSchema';


// Settings
// // import Settings       from './Settings';
import hostAlias      from './HostAlias';
import Hook           from './Hook';
import PresetManager  from './PresetManager';

const Settings = {
  hostAlias       : hostAlias,
  hook            : Hook,
  presetManager   : new PresetManager(),
}


const rm = RequestManager(RequestSchema,Settings);

export default rm;