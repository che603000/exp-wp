/**
 * Created by alex on 08.08.2016.
 */

export default {
    height: 200,
    view: "template",
    template: "Default template with some text inside"
}


export const D = {
    id: 'profile',
    view: "accordion",
    //multi:true,
    rows: [
        {header: "col 2", body: "content 2"},
        {header: "col 3", body: "content 3"}
    ]
}