import express from 'express';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {
  approveRequestToJoinOrganizationController,
  createOrganizationController,
  getOrganizationController,
  getRequestsToJoinOrganizationController,
  removeOrganizationAdministratorController,
  removeOrganizationMemberController,
  requestToJoinOrganizationController,
} from '../controllers';
import {createOrganizationValidationChain} from '../validation-chains/create-organization';
import {removeOrganizationMemberValidationChain} from '../validation-chains/remove-organization-member';
import {removeOrganizationAdministratorValidationChain} from '../validation-chains/remove-organization-administrator';

const router = express.Router();

const logger = loggerConfig();

configureRoute(router, HttpRequestMethod.POST, '/create', true, createOrganizationValidationChain, makeExpressCallback(logger, createOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/:organizationId', true, [], makeExpressCallback(logger, getOrganizationController));

configureRoute(router, HttpRequestMethod.PUT, '/:organizationId/administrators/remove', true, removeOrganizationAdministratorValidationChain, makeExpressCallback(logger, removeOrganizationAdministratorController));

configureRoute(router, HttpRequestMethod.PUT, '/:organizationId/members/remove', true, removeOrganizationMemberValidationChain, makeExpressCallback(logger, removeOrganizationMemberController));

configureRoute(router, HttpRequestMethod.GET, '/requests-to-join/:organizationId', true, [], makeExpressCallback(logger, getRequestsToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.POST, '/request-to-join/:organizationId', true, [], makeExpressCallback(logger, requestToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.PUT, '/request-to-join/approve/:requestToJoinOrganizationId', true, [], makeExpressCallback(logger, approveRequestToJoinOrganizationController));

export {router as OrganizationsRouter};
