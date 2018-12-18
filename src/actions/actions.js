export const UPDATE_SETTING = 'UPDATE_SETTING';
export const CREATE_TRACE = 'CREATE_TRACE'; //Not sure if needed w/create_layer we'll see!
export const CREATE_LAYER = 'CREATE_LAYER';
export const DELETE_LAYER = 'DELETE_LAYER';

export function updateSetting(setting, value){

    return {
        type: UPDATE_SETTING,
        payload: { setting, value }
    }

}