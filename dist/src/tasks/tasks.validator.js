"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Priority_1 = require("../enums/Priority");
const Status_1 = require("../enums/Status");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('The task title is mandatory')
        .trim()
        .isString()
        .withMessage('Title needs to be in text format'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('The task date is mandatory')
        .isString()
        .withMessage('The date needs to be a valid date format'),
    (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('Description needs to be in text format'),
    (0, express_validator_1.body)('priority')
        .trim()
        .isIn([Priority_1.Priority.normal, Priority_1.Priority.high, Priority_1.Priority.low])
        .withMessage('Priority can only be normal, high, or low'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([
        Status_1.Status.todo,
        Status_1.Status.inProgress,
        Status_1.Status.completed,
    ])
        .withMessage('Status can only be todo, inProgress, or completed'),
];
exports.updateValidator = [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .withMessage('The task id is mandatory')
        .trim()
        .isString()
        .withMessage('ID needs to be a valid uuid format'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([
        Status_1.Status.todo,
        Status_1.Status.inProgress,
        Status_1.Status.completed,
    ])
        .withMessage('Status can only be todo, inProgress or completed'),
];
