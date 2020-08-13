Ext.namespace('Ext.ux.dd');

Ext.ux.dd.GridReorderDropTarget = function (grid, config) {

    this.target = new Ext.dd.DropTarget(grid.getEl(), {
        ddGroup: grid.ddGroup || 'GridDD'
        , grid: grid
        , gridDropTarget: this
        , notifyDrop: function (dd, e, data) {


            if (this.currentRowEl) {
                this.currentRowEl.removeClass("grid-row-insert-below");
                this.currentRowEl.removeClass("grid-row-insert-above");
            }


            var t = Ext.lib.Event.getTarget(e);
            var rindex = this.grid.getView().findRowIndex(t);

            if (rindex === false) return false;
            if (rindex == data.rowIndex) return false;


            if (this.gridDropTarget.fireEvent(this.copy 'beforerowcopy'
        :
            'beforerowmove', this.gridDropTarget, data.rowIndex, rindex, data.selections, 123
        ) ===
            false
        )
            return false;


            var ds = this.grid.getStore();


            var selections = new Array();
            var keys = ds.data.keys;
            for (key in keys) {
                for (i = 0; i < data.selections.length; i++) {
                    if (keys[key] == data.selections[i].id) {

                        if (rindex == key) return false;
                        selections.push(data.selections[i]);
                    }
                }
            }

            if (!this.copy) {
                for (i = 0; i < data.selections.length; i++) {
                    ds.remove(ds.getById(data.selections[i].id));
                }
            }

            if (rindex > data.rowIndex && data.selections.length > 1) {
                rindex = rindex - (data.selections.length - 1);
            }

            for (i = selections.length - 1; i >= 0; i--) {
                ds.insert(rindex, selections[i]);
            }


            sm = this.grid.getSelectionModel();
            if (sm) sm.selectRecords(data.selections);


            this.gridDropTarget.fireEvent(this.copy
            'afterrowcopy'
        :
            'afterrowmove', this.gridDropTarget, data.rowIndex, rindex, data.selections
        )
            ;

            return true;
        }
        , notifyOver: function (dd, e, data) {

            var t = Ext.lib.Event.getTarget(e);
            var rindex = this.grid.getView().findRowIndex(t);


            var ds = this.grid.getStore();
            var keys = ds.data.keys;
            for (key in keys) {
                for (i = 0; i < data.selections.length; i++) {
                    if (keys[key] == data.selections[i].id) {
                        if (rindex == key) {
                            if (this.currentRowEl) {
                                this.currentRowEl.removeClass("grid-row-insert-below");
                                this.currentRowEl.removeClass("grid-row-insert-above");
                            }
                            return this.dropNotAllowed;
                        }
                    }
                }
            }


            if (rindex < 0 || rindex === false) {
                this.currentRowEl.removeClass("grid-row-insert-above");
                return this.dropNotAllowed;
            }

            try {
                var currentRow = this.grid.getView().getRow(rindex);

                var resolvedRow = new Ext.Element(currentRow).getY() - this.grid.getView().scroller.dom.scrollTop;
                var rowHeight = currentRow.offsetHeight;


                this.rowPosition = e.getPageY() - resolvedRow - (rowHeight / 2);


                if (this.currentRowEl) {
                    this.currentRowEl.removeClass("grid-row-insert-below");
                    this.currentRowEl.removeClass("grid-row-insert-above");
                }

                if (this.rowPosition > 0) {

                    this.currentRowEl = new Ext.Element(currentRow);
                    this.currentRowEl.addClass("grid-row-insert-below");
                } else {

                    if (rindex - 1 >= 0) {
                        var previousRow = this.grid.getView().getRow(rindex - 1);
                        this.currentRowEl = new Ext.Element(previousRow);
                        this.currentRowEl.addClass("grid-row-insert-below");
                    } else {

                        this.currentRowEl.addClass("grid-row-insert-above");
                    }
                }
            } catch (err) {
                console.warn(err);
                rindex = false;
            }

            return (rindex === false)
            this.dropNotAllowed
        :
            this.dropAllowed;
        }
        , notifyOut: function (dd, e, data) {

            if (this.currentRowEl) {
                this.currentRowEl.removeClass("grid-row-insert-above");
                this.currentRowEl.removeClass("grid-row-insert-below");
            }
        }
    });

    if (config) {
        Ext.apply(this.target, config);
        if (config.listeners) Ext.apply(this, {listeners: config.listeners});
    }

    this.addEvents({
        "beforerowmove": true
        , "afterrowmove": true
        , "beforerowcopy": true
        , "afterrowcopy": true
    });
    Ext.ux.dd.GridReorderDropTarget.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.dd.GridReorderDropTarget, Ext.util.Observable, {
    getTarget: function () {
        return this.target;
    }
    , getGrid: function () {
        return this.target.grid;
    }
    , getCopy: function () {
        return this.target.copy
        true
    :
        false;
    }
    , setCopy: function (b) {
        this.target.copy = b
        true
    :
        false;
    }
}); 