
(function() {
  'use strict';

  angular.module('frontend.core.directives')
    .directive('gqlView', function directive() {
      return {
        restrict: 'E',
        scope: {
          item: '=',
          text: '='
        },
        replace: true,
        template : '<span class="text-nowrap clickable" data-ng-click="openGqlView(item)"><i uib-tooltip="GraphQL view" class="mdi mdi-graphql"></i>{{text ? "&nbsp;&nbsp;" + text : ""}}</span>',
        controller: [
          '$scope','$uibModal',
          function controller($scope,$uibModal) {

            $scope.openGqlView = function(item) {
              $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template: '<div class="modal-header primary">' +
                ' <h5 class="modal-title" id="modal-title">' +
                'GraphQL View' +
                '<a  class="modal-close pull-right" ng-click="close()">' +
                '<i class="mdi mdi-close"></i>' +
                '</a>' +
                '</h5>' +
                '</div>' +
                '<div class="modal-body">' +
                '<label>Original Operation</label>' +
                '<pre ng-bind-html="operation"></pre>' +
                '<label>Operation Signature</label>' +
                '<pre ng-bind-html="signature"></pre>' +
                // '<pre class="no-margin">{{item}}</pre>' +
                '</div>',
                controller: function($scope,$uibModalInstance,_operation, _signature){
                  $scope.operation = _operation
                  $scope.signature = _signature
                  $scope.close = function(){
                    $uibModalInstance.dismiss()
                  }
                },
                controllerAs: '$ctrl',
                resolve: {
                  _operation: function () {
                    return item.operation.replace(/\n/g, '<br />');
                  },
                  _signature: function () {
                    return item.signature.replace(/\n/g, '<br />');
                  },
                }
              });
            }

          }
        ]
      };
    })
  ;
}());
