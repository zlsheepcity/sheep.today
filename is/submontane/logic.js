var ggUI = {
    getGodsheepDom: function(domname) {
        return $(domname);
    },
    displayUniverse: function(dom) {
        dom.append('<div>Universe</div>');
    }
}

function ggUniverse(dataset) {
    this.status = true;
    this.calendar = false;
    this.godsheep = false;
    this.world = false;

    this.Test = function() {
        console.log('=== run test ===');
        console.log('this', this);
    };

    this.HQinit = function() {
        this.CreateCalendar();
        this.CreateGodsheep();
        this.CreateWorld();
        this.SheepHappens();
        this.AskGodsheep();
    }

    this.CreateCalendar = function() {
        this.calendar = { status: true, year: 0 };
        this.calendar.events = [];
    }

    this.CreateGodsheep = function() {
        this.godsheep = { status: true, name: 'godsheep' };
        this.godsheep.dom = ggUI.getGodsheepDom('#World');
        this.calendar.events.push({ year: 0, event: 'hello' });
    }

    this.CreateWorld = function() {
        this.world = ggCreateWorld();
        ggDrawWorld(this);
    }

    this.SheepHappens = function() {
        // add regular
        // check events
    }

    // ------------------------------------- Ask God

    this.AskGodsheep = function() {
        
    }

}

var gg = new ggUniverse();

$(function(){
    gg.Test();
    gg.HQinit();
    gg.Test();

    //console.log($('body'));
});


function ggCreateWorld() {
    var world = { status: true };
    world.mnt = []; // mountains
    world.mnt[0] = ggCreateMountain();
    world.cld = []; // clouds
    return world;
}

function ggCreateMountain(dna) {
    var mnt = { status: true };
    mnt.h = 1000;
    mnt.lvl = 1;

    return mnt;
}

function ggDrawWorld(gg) {
    var dom = gg.godsheep.dom;
    ggUI.displayUniverse(dom);
}



