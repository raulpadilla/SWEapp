/*
  Copyright (c) 2012 Open Lab
  Written by Roberto Bicchierai and Silvia Chelazzi http://roberto.open-lab.com
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Ganttalendar(master) {
    this.master = master; // is the a GantEditor instance
    this.highlightBar = 0;
}


//<%-------------------------------------- GANT TASK GRAPHIC ELEMENT --------------------------------------%>
Ganttalendar.prototype.drawTask = function (Events,row) {
    var self = this;
    var eventcls =  "siebui-ganttDrilldown";
    var editorRow = self.master.utility.find("[id=" + row + "]");
    var rowindex = ($(editorRow).closest('tr')).index();
    var top = rowindex * $(editorRow).closest('tr').height();
    var imgfolder = "../images/";
    var iconInfo = this.renderInfo["ICON_INFO"];

    if(Events)
    {
        var task;
        var taskId;
        var pTask = "";
        var counter = 0;
        var height = $(".siebui-taskEditRow").height();

        for(var nC= 0 ;nC < Events.length; nC++ )
        {
            var calculatedtop;
            var y;
            var eheight;
            var borderwidth = parseInt($(".siebui-layout").css("border-width"),10);
            task = self.master.getEvent(row,Events[nC]);
            task["CLS"] = eventcls;
            var start = new Date(task.ST);
            var end = new Date(task.ET);
            //resetting the counter for the next set of overlapping record of the same resource.
            if (task.OLPCNT && pTask !== "" && pTask.loco)
            {
                counter = 0;
            }
            //resetting the counter for the next set of overlapping record of the same resource.
            
            if(task.OLPCNT)
            {
                counter++;
                y = (height/task.OLPCNT);

                if (counter == 1)
                {
                    calculatedtop = top;
                }
                else if (task.OTE)
                {
                }
                else
                {
                    calculatedtop = calculatedtop + y;
                }
                if (borderwidth > 0)
                {
                    eheight = y - task.OLPCNT/(2 * borderwidth);
                }
            }
            else
            {
                counter = 0;
                calculatedtop = top;
                eheight = height;
            }

            var x = Math.round((start - self.startMillis) * self.fx);
            var taskBox = $.JST.createFromTemplate(task, "TASKBAR");
            var drg = ((self.DDrag != "Y") && (task["DRG"]==='Y'));
            var rsz = ((self.DRSZ != "Y") && (task["RSZ"] ? task["RSZ"] === "Y"  : task["DRG"]==="Y"));
            if(drg)
            {
               taskBox.addClass("siebui-taskBox Dragpble");
            }
            if(rsz)
            {
               taskBox.addClass("siebui-taskBox Rsizable");
            }
            if(!drg && !rsz)
            {
               taskBox.addClass("siebui-taskBox");
            }
            if (task["Icon"])
            {
                var iarray = task["Icon"].split(',');
                for (var nicon= 0 ;nicon < iarray.length; nicon++)
                {
                    var span = $("<span>");
                    if (iconInfo && iconInfo[iarray[nicon]])
                    {
                        var cssclass = iconInfo[iarray[nicon]];
                        var image = $("<span>").addClass(cssclass);
                        span.append(image);
                        taskBox.children(0).append(span);
                    }
                }
            }
            //save row element on task

            taskBox.css({top:calculatedtop, height:eheight,left:x,width:Math.round((end - start) * self.fx)});
            var Val = self.master.utility.find("[id=" + row + "]").find("td");
            Val.append(taskBox);
            pTask = task;
        }
    }
};


Ganttalendar.prototype.addTask = function (task) {
};


//<%-------------------------------------- GANT DRAW LINK ELEMENT --------------------------------------%>
//'from' and 'to' are tasks already drawn

Ganttalendar.prototype.reset = function() {
    this.element.find("[taskId]").remove();
};

Ganttalendar.prototype.redrawTasks = function() {
    for (var i=0;i<this.master.tasks.length;i++)
    {
        var taskrow  = this.master.tasks[i];
        // Sorting Event based on Display order.

        var taskEvents = this.master.gettaskSeqEvents(taskrow);
        // Sorting Event based on Display order.
        this.drawTask(taskEvents,taskrow);
    }
};


Ganttalendar.prototype.refreshGantt = function() {
    var par = this.element.parent();

    //try to maintain last scroll
    var scrollY=par.scrollTop();
    var scrollX=par.scrollLeft();

    this.element.remove();
    var domEl = this.createGantt();
    this.element = domEl;
    par.append(domEl);

    this.redrawTasks();

    //set current task
    if (this.master.currentTask)
    {
        this.highlightBar.css("top", this.master.currentTask.rowElement.position().top);
    }
};
