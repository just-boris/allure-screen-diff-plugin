/*global angular*/
(function() {
    "use strict";
    var module = angular.module('allure.screenDiff', []);
    module.config(function($stateProvider, allurePluginsProvider) {
        allurePluginsProvider.addTab('screenDiff', {
            title: 'Screenshots',
            icon: 'fa fa-picture-o',
            controllerAs: 'ctrl',
            resolve: {
                suites: function($http) {
                    return $http.get('data/xunit.json').then(function(response) {
                        return response.data;
                    });
                }
            }
        });
        allurePluginsProvider.addWidget('screenDiff', {
            title: 'Screenshot mismatches',
            templateUrl: 'plugins/screenDiff/widget.tpl.html',
            tabLink: 'screenDiff'
        });
        allurePluginsProvider.addStylesheet('screenDiff');
        $stateProvider.state('screenDiff.testcase', {
            url: "/:testcaseUid"
        }).state('screenDiff.testcase.expanded', {
            url: '/expanded'
        });
    });
    module.controller('ScreenDiffCtrl', function($scope, $state, suites, Collection) {
        "use strict";
        this.list = new Collection(suites.testSuites);
        this.list.items.forEach(function(testsuite) {
            testsuite.failed = testsuite.statistic.failed + testsuite.statistic.broken;
        });
        this.sorting = {
            predicate: 'title',
            reverse: false
        };

        this.isState = function(statename) {
            return $state.is(statename);
        };
        this.selectTestcase = function(testcase) {
            $state.go('screenDiff.testcase', {testcaseUid: testcase.uid})
        };
        $scope.$on('$stateChangeSuccess', function(event, state, params) {
            delete this.testcase;
            if(params.testcaseUid) {
                this.list.items.some(function(testsuite) {
                    var testcase = testsuite.testCases.filter(function(testcase) {
                        return testcase.uid === params.testcaseUid;
                    })[0];
                    if(testcase) {
                        this.testcase = testcase;
                        testsuite.$expanded = true;
                        return true;
                    }
                }, this);
            }
        }.bind(this));
        $scope.$watch('ctrl.sorting', this.list.sort.bind(this.list), true);
    });
    module.controller('ScreenDiffTestcaseController', function($scope, $http, $state) {
        function loadTestcase(uid) {
            $http.get('data/'+uid+'-testcase.json').then(function(response) {
                $scope.testcase = response.data;
                $scope.screenshots = $scope.testcase.attachments.reduce(function(screenshots, attach) {
                    screenshots[attach.title] = attach;
                    return screenshots;
                }, {});
                $scope.viewType = $scope.screenshots.diff ? 'diff' : 'overlay';
                $scope.overlay = 0;
            });
        }
        $scope.getSourceUrl = function(attachment) {
            return attachment && 'data/' + attachment.source;
        };
        $scope.isExpanded = function() {
            return $state.is('screenDiff.testcase.expanded');
        };
        $scope.toggleExpanded = function() {
            $state.go('screenDiff.testcase' +
                ($scope.isExpanded() ? '' : '.expanded')
            );
        };
        $scope.$watch('ctrl.testcase.uid', function(uid) {
            if(uid) {
                loadTestcase(uid);
            }
        })
    })
})();
