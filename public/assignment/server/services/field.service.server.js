"use strict";

module.exports = function(app,model) {

    app.post("/api/assignment/form/:formId/field", CreateFormField);
    app.get("/api/assignment/form/:formId/field", FindFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", FindFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", DeleteFormField);


}