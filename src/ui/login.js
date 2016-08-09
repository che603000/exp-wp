/**
 * Created by alex on 08.08.2016.
 */
export default {
    width: 400,
    minWidth: 100,
    header: "Вход в систему",
    body: {
        view: "form",
        id: "myForm",

        elements: [
            {
                view: "text",
                label: "Email",
                validate: webix.rules.isEmail,
                required:true,
                invalidMessage: 'Не похоже на email...',
                name: "email"
            },
            {view: "text", type: "password", label: "Password", name: "password"},
            {
                margin: 5,
                cols: [
                    {
                        view: "button", value: "Login", type: "form", click: (name, e)=> {
                        const form = $$("myForm");
                        if (form.validate()) {
                            webix.ajax().post("/api/test", form.getValues())
                                .then(function (data) { /*success*/
                                    console.log(data.json());
                                })
                                .fail(function (err) {/*error*/
                                    console.log(err);
                                });


                        }else
                            webix.message({type:"error", text:"Ошибки в форме..."});
                        //alert('submit')
                    }
                    },
                    {
                        view: "button", value: "Cancel"
                    }
                ]
            }
        ]
    }

}