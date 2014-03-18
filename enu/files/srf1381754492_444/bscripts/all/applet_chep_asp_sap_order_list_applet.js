function CHEP_ASP_SAP_Order_List_Applet_Applet_PreInvokeMethod (name, inputPropSet)
{

	// HSINGH 05/13/09
	
	if(name == "CreateSR")
	{
		CreateSR();
		return ("CancelOperation");
	}
	else
	{	
		return ("ContinueOperation");
	}	
}

function CreateSR()
	{
	
	
	/* 
		Author:		HSINGH
		Date:		05/10/09
		Utility:	SR Creation , Insert Contact FirstName , Contact Last Name from Account Summary View
		*/
		
		var psIn, psOut, serviceSR, curr, contBC, contFn, contLn, sAccountExtended, sExt, sQty, sUnit, sDelWin, sPO, sEmgCh,sBatch;
		var bo;
		//	var iOperation = ContinueOperation;
	
		try 
		{
	
			sAccountExtended = "";
			//Get buscomp of current applet
			bo = TheApplication().ActiveBusObject();
			curr = bo.GetBusComp("CHEP SAP Order Extern");
			// In Case this.BusComp() errors use the ones above and comment below
	
	//		curr = this.BusComp();
	
			psIn = theApplication().NewPropertySet();
			psOut = theApplication().NewPropertySet();
			// Get the service that creates SR
	
			serviceSR = theApplication().GetService("Chep Order Utilities");
			psIn.SetProperty("OrderType", curr.GetFieldValue("DOC_TYPE"));
			psIn.SetProperty("SalesOrderNo", curr.GetFieldValue("SD_DOC"));
	
			sAccountExtended += "Shipping Condition:" + curr.GetFieldValue("SHIP_COND") + "\n";
			sAccountExtended += "Line Item Number#:" + curr.GetFieldValue("ITM_NUMBER") + "---------------\n";
			sAccountExtended += "\tMaterial:" + curr.GetFieldValue("MATERIAL") + "\n";
			sAccountExtended += "\tOrder Quantity:" + curr.GetFieldValue("REQ_QTY")+" " + curr.GetFieldValue("SALES_UNIT") + "\n";
			sAccountExtended += "\tPlant:" + curr.GetFieldValue("PLANT") + "\n";

			sBatch = curr.GetFieldValue("BATCH");
			
			if( sBatch!= "Ready for Use Standard" && sBatch != "Awaiting Inspection")
				sAccountExtended += "\tBatch:" + sBatch + "\n";
		
			sAccountExtended += "\tDelivery Date:" + curr.GetFieldValue("EDATU_D") + " - " + curr.GetFieldValue("NAMEOFSTATE") + "\n";
		
			sEmgCh = curr.GetFieldValue("ZZEO");
			if( sEmgCh == "Y")
				sAccountExtended += "\tEmergency Load: Yes\n";
		
			sPO = curr.GetFieldValue("PURCH_NO_C");
			if( sPO != "")
				sAccountExtended += "\tPurchase Order #:" + sPO+ "\n";


			psIn.SetProperty("AccountExtended", sAccountExtended);
			psIn.SetProperty("ShippingCondition", curr.GetFieldValue("SHIP_COND"));
			psIn.SetProperty("Plant", curr.GetFieldValue("PLANT"));
			psIn.SetProperty("Batch", curr.GetFieldValue("BATCH"));
			psIn.SetProperty("AccountId", curr.GetFieldValue("SHIP_TO"));
				
	
			if (theApplication().ActiveViewName() == "CHEP Account Summary Page View")
			{
				contApplet = theApplication().FindApplet("Chep ASP Account Contact List Applet");
				contBC = contApplet.BusComp();
				
				contFn = contBC.GetFieldValue("First Name");
				contLn = contBC.GetFieldValue("Last Name");
					
				if ((contFn != null) && (contFn != ""))
				{
					if (confirm(" Are you sure you want to add " + contFn + " " + contLn +" to the Service Request"))
					{
						psIn.SetProperty("ContactID", contBC.GetFieldValue("Id"));
						psIn.SetProperty("FirstName", contFn);
						psIn.SetProperty("LastName", contLn);
					}
				}
			}	
				
			serviceSR.InvokeMethod("CreateSR",psIn,psOut);
			//iOperation = CancelOperation;
			//return (iOperation);
		}	
		catch(e)
		{
			alert(e.errText);
		}
		finally
		{
			contBC = null;
			serviceSR = null;
			psOut = null;
			psIn = null;
			curr = null;
			
		}
		
	}

function CHEP_ASP_SAP_Order_List_Applet_Applet (applet)
{
   if (applet != null)
   {
      this._applet = applet;
      applet.shadow = this;
   }
}

new CHEP_ASP_SAP_Order_List_Applet_Applet (null);

CHEP_ASP_SAP_Order_List_Applet_Applet.prototype = new top.JSSAppletShadow ();

CHEP_ASP_SAP_Order_List_Applet_Applet.prototype.OnPreInvokeMethod = CHEP_ASP_SAP_Order_List_Applet_Applet_PreInvokeMethod;
theApplication = top.theApplication;
TheApplication = top.theApplication;