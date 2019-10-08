const dai = function (profile, ida) {
    var df_func = {};
    var mac_addr = (function () {
        function s () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s() + s() + s();
    })();

    if (profile.is_sim == undefined){
        profile.is_sim = false;
    }

    for (var i = 0; i < profile.df_list.length; i++) {
        df_name = profile.df_list[i].name;
        if(df_name[df_name.length-2] == '_'){
            df_name = df_name.substr(0, df_name.length-2) + '-' + df_name.substr(df_name.length-1);
        }
        // df_name = profile.df_list[i].name.replace(/_/g, '-')
        df_func[df_name] = profile.df_list[i];
        profile.df_list[i] = df_name;
        console.log(df_name);
    }

    function pull (odf_name, data) {
        if (odf_name == 'Control') {
            switch (data[0]) {
            case 'SET_DF_STATUS':
                dan.push('Control', ['SET_DF_STATUS_RSP', data[1]], function (res) {});
                break;
            case 'RESUME':
                ida.suspended = false;
                dan.push('Control', ['RESUME_RSP', ['OK']], function (res) {});
                break;
            case 'SUSPEND':
                ida.suspended = true;
                dan.push('Control', ['SUSPEND_RSP', ['OK']], function (res) {});
                break;
            }
        } else {
            df_func[odf_name](data);
        }
    }

    function init_callback (result) {
        console.log('register:', result);
        document.title = profile.d_name;
        console.log(ida);
        ida.iot_app(profile);
    }

    function deregisterCallback (result) {
        console.log('deregister:', result);
    }

    function deregister () {
        dan.deregister(deregisterCallback);
    }

    window.onunload = deregister;
    window.onbeforeunload = deregister;
    window.onclose = deregister;
    window.onpagehide = deregister;

    dan.init(pull, csmapi.get_endpoint(), mac_addr, profile, init_callback);
};
