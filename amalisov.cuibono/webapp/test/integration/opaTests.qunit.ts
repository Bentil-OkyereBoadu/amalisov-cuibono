// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

// import all your OPA journeys here
void Promise.all([import("amalisov/cuibono/test/integration/MainJourney")]).then(() => {
	QUnit.start();
});
