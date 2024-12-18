Attribute VB_Name = "ProjectModule"
Function GetUniqueSortedValues(rng As Range) As Variant
    Dim dict As Object
    Dim cell As Range
    Dim values() As Variant
    Dim i As Integer
    
    Set dict = CreateObject("Scripting.Dictionary")
    
    For Each cell In rng
        If Not dict.exists(cell.Value) Then
            dict.Add cell.Value, Nothing
        End If
    Next cell
    
    values = dict.Keys
    ' Sort the values
    Call BubbleSort(values)
    
    GetUniqueSortedValues = values
End Function

Sub BubbleSort(arr As Variant)
    Dim temp As Variant
    Dim i As Integer
    Dim j As Integer
    
    For i = LBound(arr) To UBound(arr) - 1
        For j = i + 1 To UBound(arr)
            If arr(i) > arr(j) Then
                temp = arr(i)
                arr(i) = arr(j)
                arr(j) = temp
            End If
        Next j
    Next i
End Sub

Sub changeTrainsets()
    Dim wsProyek As Worksheet
    Dim wsTrainset As Worksheet
    Dim wsPreset As Worksheet
    Dim totalTrainset As Long
    Dim i As Long
    Dim lastTsNumRow As Long
    Dim lastTsNumCol As Long
    Dim validationRange As Range

    ' Set the worksheets
    Set wsProyek = ThisWorkbook.Sheets("Proyek") ' Change the sheet name as needed
    Set wsTrainset = ThisWorkbook.Sheets("Trainset")
    Set wsPreset = ThisWorkbook.Sheets("Preset Trainset")

    ' Get the end number from cell B6
    totalTrainset = wsProyek.Range("B6").Value

    ' Find the last row with data in column A
    lastTsNumRow = wsTrainset.Cells(wsTrainset.Rows.Count, 1).End(xlUp).Row

    ' Find the last column with data in row 3
    lastTsNumCol = wsTrainset.Cells(3, wsTrainset.Columns.Count).End(xlToLeft).Column

    ' Clear content in columns A to G starting from the last row
    If lastTsNumRow > totalTrainset + 3 Then
        wsTrainset.Range(wsTrainset.Cells(totalTrainset + 4, 1), wsTrainset.Cells(lastTsNumRow, lastTsNumCol)).ClearContents
        wsTrainset.Range(wsTrainset.Cells(totalTrainset + 4, 1), wsTrainset.Cells(lastTsNumRow, lastTsNumCol)).Validation.Delete
    Else
        ' Loop to create rows with numbers starting at row 4
        For i = lastTsNumRow - 2 To totalTrainset
            wsTrainset.Cells(3 + i, 1).Value = i
            wsTrainset.Cells(3 + i, 2).Value = "TS" & i

            ' Add data validation to the next cell
            Set validationRange = wsPreset.Range("A4:A" & wsPreset.Cells(wsPreset.Rows.Count, "A").End(xlUp).Row)
            With wsTrainset.Cells(3 + i, 3).Validation
                .Delete ' Remove any existing validation
                .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:= _
                    xlBetween, Formula1:="='Preset Trainset'!" & validationRange.Address
                .IgnoreBlank = True
                .InCellDropdown = True
                .ShowInput = True
                .ShowError = True
            End With

            ' Select the first item from the list
            If validationRange.Cells.Count > 0 Then
                wsTrainset.Cells(3 + i, 3).Value = validationRange.Cells(1, 1).Value
            End If
        Next i
    End If
End Sub

Sub changeCarriage(target As Range) 
    Dim tableName As String
    Dim carriageTableRange As Range
    Dim typeColumn As Range
    Dim typeRowCount As Integer
    Dim lastPresetColumn As Integer
    Dim lastTrainsetColumn As Integer
    Dim countPresetCarriages As Integer
    Dim countTrainsetCarriages As Integer
    Dim wsPreset As Worksheet
    Dim wsTrainset As Worksheet
    Dim i As Integer
    
    Set carriageTableRange = Worksheets("Gerbong").ListObjects("InitGerbong").Range
    Set typeColumn = carriageTableRange.Rows(1)
    If Not typeColumn Is Nothing Then
        typeRowCount = typeColumn.End(xlDown).Row - typeColumn.Row
    End If
    ' changing carriage on preset trainset
    Set wsPreset = ThisWorkbook.Sheets("Preset Trainset")

    lastPresetColumn = wsPreset.Cells(3, wsPreset.Columns.Count).End(xlToLeft).Column
    countPresetCarriages = lastPresetColumn - 1

    wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(2, lastPresetColumn)).UnMerge
    wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(wsPreset.Rows.Count, lastPresetColumn)).ClearFormats
    If countPresetCarriages > typeRowCount Then
        wsPreset.Range(wsPreset.Cells(3, typeRowCount + 3), wsPreset.Cells(wsPreset.Rows.Count, lastPresetColumn)).ClearContents
    Else
        wsPreset.Cells(3, lastPresetColumn).ClearContents

        For i = 1 To typeRowCount
            wsPreset.Cells(3, i + 1).Value = typeColumn.Rows(i + 1).Value
            wsPreset.Cells(3, i + 1).HorizontalAlignment = xlCenter
            wsPreset.Cells(3, i + 1).Borders.LineStyle = xlContinuous
            wsPreset.Cells(3, i + 1).Borders.Weight = xlThin
            wsPreset.Cells(3, i + 1).Interior.Color = rgb(142, 169, 219)
        Next i
    End If
        lastPresetColumn = wsPreset.Cells(3, wsPreset.Columns.Count).End(xlToLeft).Column
        wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(wsPreset.Cells(wsPreset.Rows.Count, 1).End(xlUp).Row, lastPresetColumn)).HorizontalAlignment = xlCenter
        wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(wsPreset.Cells(wsPreset.Rows.Count, 1).End(xlUp).Row, lastPresetColumn)).Borders.LineStyle = xlContinuous
        wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(wsPreset.Cells(wsPreset.Rows.Count, 1).End(xlUp).Row, lastPresetColumn)).Borders.Weight = xlThin
        wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(3, lastPresetColumn)).Interior.Color = rgb(142, 169, 219)
        wsPreset.Range(wsPreset.Cells(2, 2), wsPreset.Cells(2, lastPresetColumn)).Merge
    

    ' changing carriage on trainset
    Set wsTrainset = ThisWorkbook.Sheets("Trainset")

    lastTrainsetColumn = wsTrainset.Cells(3, wsTrainset.Columns.Count).End(xlToLeft).Column
    countTrainsetCarriages = lastTrainsetColumn - 3

    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(2, lastTrainsetColumn)).UnMerge
    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(3, lastTrainsetColumn)).ClearFormats
    If countTrainsetCarriages > typeRowCount Then
        wsTrainset.Range(wsTrainset.Cells(3, typeRowCount + 4), wsTrainset.Cells(wsTrainset.Rows.Count, lastTrainsetColumn)).ClearContents
    Else
        wsTrainset.Cells(3, lastTrainsetColumn).ClearContents

        For i = 1 To typeRowCount
            wsTrainset.Cells(3, i + 3).Value = typeColumn.Rows(i + 1).Value
            wsTrainset.Cells(3, i + 3).HorizontalAlignment = xlCenter
            wsTrainset.Cells(3, i + 3).Borders.LineStyle = xlContinuous
            wsTrainset.Cells(3, i + 3).Borders.Weight = xlThin
            wsTrainset.Cells(3, i + 3).Interior.Color = rgb(142, 169, 219)
        Next i
    End If
    

    lastTrainsetColumn = wsTrainset.Cells(3, wsTrainset.Columns.Count).End(xlToLeft).Column
    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(wsTrainset.Cells(wsTrainset.Rows.Count, 1).End(xlUp).Row, lastTrainsetColumn)).HorizontalAlignment = xlCenter
    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(2, lastTrainsetColumn)).Merge
    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(2, lastTrainsetColumn)).Borders.LineStyle = xlContinuous
    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(3, lastTrainsetColumn)).Borders.Weight = xlThin
    wsTrainset.Range(wsTrainset.Cells(2, 4), wsTrainset.Cells(3, lastTrainsetColumn)).Interior.Color = rgb(142, 169, 219)
    
End Sub

Sub changePresetTrainsetCount(changedCell As Range)
    Dim newValue As String
    Dim wsPreset As Worksheet
    Dim foundCell As Range
    
    newValue = changedCell.Value
    Set wsPreset = ThisWorkbook.Sheets("Preset Trainset")
    
    ' Find the new value in the Preset sheet
    Set foundCell = wsPreset.Range("A4:A" & wsPreset.Cells(wsPreset.Rows.Count, "A").End(xlUp).Row).Find(What:=newValue, LookIn:=xlValues, LookAt:=xlWhole)
    
    If Not foundCell Is Nothing And Not newValue = "Custom" Then
        ' Determine the number of columns to copy from row 3 of Preset sheet
        colCount = Application.WorksheetFunction.CountA(wsPreset.Rows(3))
        
        ' Update the cells in the same row to match the columns in row 3 of Preset sheet
        For i = 1 To colCount
            changedCell.Offset(0, i).Value = foundCell.Offset(0, i).Value
        Next i
    Else
        MsgBox "Value not found in Preset sheet."
    End If
End Sub

Sub changePresetTrainset(changedCell As Range, oldValue As String)
    Dim wsPreset As Worksheet
    Dim wsTrainset As Worksheet
    Dim validationRange As Range
    Dim lastRow As Long
    Dim i As Long

    ' MsgBox "Value changed: " & oldValue

    Set wsPreset = ThisWorkbook.Sheets("Preset Trainset")
    Set wsTrainset = ThisWorkbook.Sheets("Trainset")

    lastRow = wsPreset.Cells(wsPreset.Rows.Count, "A").End(xlUp).Row
    Set validationRange = wsPreset.Range("A4:A" & lastRow)

    For i = 1 To wsTrainset.Cells(wsTrainset.Rows.Count, "C").End(xlUp).Row - 3
        With wsTrainset.Cells(3 + i, 3).Validation
            .Delete ' Remove any existing validation
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:= _
                xlBetween, Formula1:="='Preset Trainset'!" & validationRange.Address
            .IgnoreBlank = True
            .InCellDropdown = True
            .ShowInput = True
            .ShowError = True
        End With
    Next i
    wsTrainset.Columns("C").Replace What:=oldValue, Replacement:=changedCell.Value, LookAt:=xlWhole, MatchCase:=False
    For i = 1 To wsTrainset.Cells(wsTrainset.Rows.Count, "C").End(xlUp).Row - 3
        If Not wsTrainset.Cells(3 + i, 3).Value = "Custom" Then
            Call changePresetTrainsetCount(wsTrainset.Cells(3 + i, 3))
        End If
    Next i
End Sub

Sub UpdateCarriageValidation(changedCarriageType As Range, oldValue As String)
    Dim wsCarriage As Worksheet
    Dim wsPanel As Worksheet
    Dim wsComponent As Worksheet
    Dim validationRange As Range
    Dim lastRow As Long
    Dim cell As Range
    Dim newValue As String
    
    Set wsCarriage = ThisWorkbook.Sheets("Gerbong")
    Set wsPanel = ThisWorkbook.Sheets("Panel")
    Set wsComponent = ThisWorkbook.Sheets("Komponen")
    
    lastRow = wsCarriage.Cells(wsCarriage.Rows.Count, "A").End(xlUp).Row
    Set validationRange = wsCarriage.Range("A3:A" & lastRow)
    
    
    ' Update the validation range in Panel worksheet
    For Each cell In wsPanel.Range("C2:C" & wsPanel.Cells(wsPanel.Rows.Count, "C").End(xlUp).Row)
        With cell.Validation
            .Delete ' Remove any existing validation
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:= _
                xlBetween, Formula1:="='Gerbong'!" & validationRange.Address
            .IgnoreBlank = True
            .InCellDropdown = True
            .ShowInput = True
            .ShowError = True
        End With
    Next cell

    ' Update the values in Panel worksheet
    wsPanel.Columns("C").Replace What:=oldValue, Replacement:=changedCarriageType.Value, LookAt:=xlWhole, MatchCase:=False
    
    ' Update the validation range in Component worksheet
    For Each cell In wsComponent.Range("D2:D" & wsComponent.Cells(wsComponent.Rows.Count, "D").End(xlUp).Row)
        With cell.Validation
            .Delete ' Remove any existing validation
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:= _
                xlBetween, Formula1:="='Gerbong'!" & validationRange.Address
            .IgnoreBlank = True
            .InCellDropdown = True
            .ShowInput = True
            .ShowError = True
        End With
    Next cell

    ' Update the values in Component worksheet
    wsComponent.Columns("D").Replace What:=oldValue, Replacement:=changedCarriageType.Value, LookAt:=xlWhole, MatchCase:=False
End Sub

Sub updatePanelValidation(changedCell As Range, oldValue As String)
    Dim validationRange As Range
    Dim lastRow As Long
    Dim cell As Range
    Dim wsPanel As Worksheet
    Dim wsComponent As Worksheet
    Dim uniqueValues As Variant
    
    Set wsPanel = ThisWorkbook.Sheets("Panel")
    Set wsComponent = ThisWorkbook.Sheets("Komponen")
    
    lastRow = wsPanel.Cells(wsPanel.Rows.Count, "A").End(xlUp).Row
    Set validationRange = wsPanel.Range("A2:A" & lastRow)
    
    uniqueValues = GetUniqueSortedValues(validationRange)
    
    ' Update validation range in Panel worksheet
    For Each cell In wsComponent.Range("C2:C" & wsComponent.Cells(wsComponent.Rows.Count, "C").End(xlUp).Row)
        With cell.Validation
            .Delete ' Remove any existing validation
            .Add Type:=xlValidateList, AlertStyle:=xlValidAlertStop, Operator:= _
                xlBetween, Formula1:=Join(uniqueValues, ",")
            .IgnoreBlank = True
            .InCellDropdown = True
            .ShowInput = True
            .ShowError = True
        End With
    Next cell

    ' Update values in Component worksheet if the old value is in the validation range
    If IsError(Application.Match(oldValue, wsPanel.Range("A3:A" & lastRow), 0)) Then
        wsComponent.Columns("C").Replace What:=oldValue, Replacement:=changedCell.Value, LookAt:=xlWhole, MatchCase:=False
    End If
End Sub

' draft
Sub sendToRekachainApi()
    Dim wb As Workbook
    Dim targetWb As Workbook
    Dim newFilePath As String
    Dim xmlHttp As Object
    Dim url As String
    Dim boundary As String
    Dim fileData As String
    Dim response As String
    Dim outputFolderPath As String

    Dim confirmed As VbMsgBoxResult
    confirmed = MsgBox("This will upload the file to the server. Are you sure?", vbQuestion + vbYesNo, "Confirmation")
    If confirmed = vbNo Then
        Exit Sub
    End If

    ' Set your URL here
    url = "http://127.0.0.1:8000/api/upload-project?intent=api.project.import.project.template"

    ' Set the workbook to the current workbook
    Set wb = ThisWorkbook

    newFilePath = wb.FullName

    ' Create an XML HTTP Request object
    Set xmlHttp = CreateObject("MSXML2.XMLHTTP")
    xmlHttp.Open "POST", url, False

    ' Create a boundary for the multipart/form-data
    boundary = "----WebKitFormBoundary" & Format(Now, "yyyymmddhhnnss")

    ' Create the data to send
    fileData = "--" & boundary & vbCrLf
    fileData = fileData & "Content-Disposition: form-data; name=""file""; filename=""" & Dir(newFilePath) & """" & vbCrLf
    fileData = fileData & "Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" & vbCrLf & vbCrLf
    fileData = fileData & CreateObject("Scripting.FileSystemObject").OpenTextFile(newFilePath, 1).ReadAll
    fileData = fileData & vbCrLf & "--" & boundary & "--"

    ' Set the request headers
    xmlHttp.setRequestHeader "Content-Type", "multipart/form-data; boundary=" & boundary
    xmlHttp.setRequestHeader "Content-Length", Len(fileData)
    xmlHttp.SetRequestHeader "X-Requested-With", "XMLHttpRequest"

    ' Send the request
    xmlHttp.Send fileData

    ' Check the response
    If xmlHttp.Status = 200 Then
        MsgBox "File uploaded successfully!", vbInformation
    Else
        MsgBox "File upload failed! Please upload manually!" & vbNewLine & "Status: " & xmlHttp.Status & " - " & xmlHttp.responseText, vbCritical
        wb.FollowHyperlink Address:="http://127.0.0.1:8000/upload-project"
    End If
End Sub