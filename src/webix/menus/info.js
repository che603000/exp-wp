/**
 * Created by alex on 08.08.2016.
 */
export default {
    id: 'info',
    width: 300,
    minWidth: 100,
    //hidden: true,
    rows: [

        {
            view: "toolbar",
            //disabled:true,
            cols: [
                {type: 'header', view: "template", $css: {"border-width": '0px;'}, template: 'вход'},
                {},
                {
                    view: "button", value: "x", width: 40, align: "right"
                }
            ]
        },
        {}

    ]
}
