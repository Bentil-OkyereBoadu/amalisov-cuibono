import Core from "sap/ui/core/Core"
import "./AllTests"

// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

(async (): Promise<void> => {
    "use strict";
    await Core.ready();
    QUnit.start();
})();

