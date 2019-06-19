/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function () {
  'use strict';

  angular.module('frontend.consumers')
    .controller('ManageGqlOpWhitelistController', [
      '$scope', '$rootScope', '$log', 'ConsumerService', 'MessageService', '$uibModalInstance', 'KongErrorService', '_consumer', '_cred',
      function controller($scope, $rootScope, $log, ConsumerService, MessageService, $uibModalInstance, KongErrorService, _consumer, _cred) {

        $scope.consumer = _consumer
        $scope.manage = manage
        $scope.close = function () {
          $uibModalInstance.dismiss()
        }

        if (_cred) {
          $scope.operation = angular.copy(_cred)
        } else {
          $scope.operation = {
            name: '',
            hash: ''
          }
        }

        function manage() {
          if ($scope.operation.id) {
            update();
          } else {
            create();
          }
        }

        function create() {
          ConsumerService
            .addCredential($scope.consumer.id, 'gql-op-whitelist', $scope.operation).then(function (resp) {
            $log.debug("Operation whitelist generated", resp)
            $rootScope.$broadcast('consumer.gql-op-whitelist.created')
            $uibModalInstance.dismiss()
          }).catch(function (err) {
            $log.error(err)
            KongErrorService.handle($scope, err);
          })
        }

        function update() {
          ConsumerService
            .updateCredential($scope.consumer.id, 'gql-op-whitelist', $scope.operation.id, $scope.operation).then(function (resp) {
            $log.debug("Operation whitelist generated", resp)
            $rootScope.$broadcast('consumer.gql-op-whitelist.created')
            $uibModalInstance.dismiss()
          }).catch(function (err) {
            $log.error(err)
            KongErrorService.handle($scope, err);
          })
        }
      }
    ])
}());
