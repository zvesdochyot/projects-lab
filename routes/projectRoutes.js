const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - name
 *         - dashboardOrder
 *         - createdAt
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the project.
 *         userId:
 *           type: number
 *           description: Unique identifier of the user who created the project.
 *         name:
 *           type: string
 *           description: The project name.
 *         description:
 *           type: string
 *           description: The project description.
 *         dashboardOrder:
 *           type: string
 *           description: Order of the project on the dashboard.
 *         backgroundColor:
 *           type: string
 *           description: The project label color.
 *         createdAt:
 *           type: string
 *           description: The project creation date.
 *         updatedAt:
 *           type: string
 *           description: Date of project information update.
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid.
 * security:
 *   - bearerAuth: []
 * tags:
 *   name: Projects
 *   description: The project management API.
 */

/**
 * @swagger
 * /api/v1/projects/:
 *   get:
 *     summary: Returns an array of all projects of the authorized user
 *     tags: [Projects]
 *     responses:
 *       '200':
 *         description: An array of all user projects was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array of the projects.
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', projectController.getProjectsForLoggedUser);

/**
 * @swagger
 * /api/v1/projects/change-order:
 *   put:
 *     summary: Changes the order of the specific project in the user's dashboard
 *     tags: [Projects]
 *     requestBody:
 *       description: The project for which you need to change the order in the dashboard.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: number
 *                 description: The project id.
 *               newIndex:
 *                 type: number
 *                 description: New project index in the dashboard.
 *               oldIndex:
 *                 type: number
 *                 description: Old project index in the dashboard.
 *     responses:
 *       '204':
 *         description: The order of the project has been successfully changed.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put('/change-order', projectController.reindexProjectsForLoggedUser);

/**
 * @swagger
 * /api/v1/projects/:
 *   post:
 *     summary: Creates a new project owned by an authorized user
 *     tags: [Projects]
 *     requestBody:
 *       description: The project to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The project name.
 *               description:
 *                 type: string
 *                 description: The project description.
 *     responses:
 *       '201':
 *         description: The request was successful and a new project was created.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', projectController.createProject);

module.exports = router;