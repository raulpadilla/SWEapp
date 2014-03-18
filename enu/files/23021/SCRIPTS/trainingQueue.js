//////////////////////////////////////////////////////////////////////////////
//
// Copyright (C) 2004 Siebel Systems, Inc., 
// All rights reserved.
//
// FILE:       trainingQueue.js
//
// CREATOR:    ERLEE
//
// DESCRIPTION
//    This file implements the eTraining Training Queue popup. HI-mode only
//
//
//////////////////////////////////////////////////////////////////////////////

// TrainingQueue javascript class
function JSSTrainingQueue()
{
}

function JSSTrainingQueue_Init()
{
   this.trainingQueueSvc = App().GetService("Training Queue");
   
   if (null == this.trainingQueueSvc)
   {
      return;
   }
   
   this.queueUpdateInterval   = 0; 
   var bIsEnabled    = false;
   var inputPropSet  = App().NewPropertySet();
   var returnPropSet = App().NewPropertySet();
   
   returnPropSet = this.trainingQueueSvc.InvokeMethod("SetupTrainingQueue", inputPropSet);
   
   if (null == returnPropSet)
   {
      return;
   }

   var count = returnPropSet.GetChildCount ();
   var tmpString;
   
   for (var i = 0; i < count; i++)
   {
      var returnSetPropSet = returnPropSet.GetChild (i);
      
      if (returnSetPropSet != null && returnSetPropSet.GetType () == "ResultSet")
      {    
         tmpString = returnSetPropSet.GetProperty("IsQueryEnabled");
         bIsEnabled = ("TRUE" == tmpString);
         
         if (bIsEnabled)
         {
            tmpString = returnSetPropSet.GetProperty("QueryInterval");
            this.queueUpdateInterval = tmpString - 0; //explicitly convert to int
         }
      }
   }
   
   if (bIsEnabled && !isNaN(this.queueUpdateInterval))
   {
      this.queueTimeoutId = setTimeout("S_TrainingQ.Query()", this.queueUpdateInterval * 1000);
   }
}   

// Query training queue on server
function JSSTrainingQueue_QueryQueue()
{
   try 
   {          
      if (this.trainingQueueSvc != null)
      {
         var inputPropSet = App().NewPropertySet ();
         this.trainingQueueSvc.InvokeMethod("QueryTrainingQueue", inputPropSet);
      }
   }
   catch(e) {}
   
   //fixme - add error handling: i.e. only reset timer if previous call was ok?      
   this.queueTimeoutId = setTimeout('S_TrainingQ.Query()', this.queueUpdateInterval * 1000); 
}

JSSTrainingQueue.prototype.Init     = JSSTrainingQueue_Init;
JSSTrainingQueue.prototype.Query    = JSSTrainingQueue_QueryQueue;
