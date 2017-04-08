(function () {
    jQuery('body').append('<link rel="stylesheet" href="plugins/screen-diff/styles.css" />');
    var ScreenDiffView = Backbone.Marionette.View.extend({
        className: 'pane__section',
        template: function (data) {
            var attachments = data.testStage.attachments;
            var diffImage = attachments.filter(function(attachment) {
                return attachment.name === 'diff';
            })[0];
            if(!diffImage) {
                return '';
            }
            return '<h3 class="pane__section-title">Screen Diff</h3>' +
                '<div class="screen-diff__content">' +
                    '<img class="screen-diff__image" src="data/attachments/'+ diffImage.source + '">' +
                '</div>';
        }
    });
    allure.api.addTestcaseBlock(ScreenDiffView, {position: 'before'});
})();
