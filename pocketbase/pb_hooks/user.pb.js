/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/subscribe", (c) => {
    const user = c.queryParamDefault("user", "")
    //$app.logger().log(c.cookie());
    if(user !== "") {
        try {
            const userObj = $app.dao().findRecordById("users", user);
            try {
                const notificationObj = $app.dao().findRecordsByExpr($dbx.hashExp({"user": user}));
                return c.json(200, { code: 200, message: "User found", data: { user: userObj, notifications: notificationObj } });
            }
            catch {
                // Notification n'existe pas
                const data = { user: userObj, notifications: [] };
                
                return c.json(404, { code: 404, message: "Notification does not exist", data: {} });
            }
            
        }
        catch {
            return c.json(404, { code: 404, message: "The given user does not exist", data: {} });
        }
    }
    // Missing parameter user
    else return c.json(422, {});
});