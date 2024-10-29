Attribute VB_Name = "ProjectModule"
Sub createTrainsets()
    Dim wsProyek As Worksheet
    Dim wsTrainset As Worksheet
    Dim wsPreset As Worksheet
    Dim totalTrainset As Long
    Dim i As Long
    Dim lastTsNumRow As Long
    Dim validationRange As Range

    ' Set the worksheets
    Set wsProyek = ThisWorkbook.Sheets("Proyek") ' Change the sheet name as needed
    Set wsTrainset = ThisWorkbook.Sheets("Trainset")
    Set wsPreset = ThisWorkbook.Sheets("Preset Trainset")

    ' Get the end number from cell B6
    totalTrainset = wsProyek.Range("B6").Value

    ' Find the last row with data in column A
    lastTsNumRow = wsTrainset.Cells(wsTrainset.Rows.Count, 1).End(xlUp).Row

    ' Clear content in columns A to G starting from the last row
    If lastTsNumRow > totalTrainset + 3 Then
        wsTrainset.Range("A" & totalTrainset + 4 & ":G" & lastTsNumRow).ClearContents
        wsTrainset.Range("A" & totalTrainset + 4 & ":G" & lastTsNumRow).Validation.Delete
    Else
        ' Loop to create rows with numbers starting at row 4
        For i = lastTsNumRow - 2 To totalTrainset
            wsTrainset.Cells(3 + i, 1).Value = i
            wsTrainset.Cells(3 + i, 2).Value = "TS" & i

            ' Add data validation to the next cell
            Set validationRange = wsPreset.Range("B4:B" & wsPreset.Cells(wsPreset.Rows.Count, "B").End(xlUp).Row)
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
    Dim tableRange As Range
    Dim typeColumn As Range
    Dim typeRowCount As Integer
    Dim lastPresetColumn As Integer
    Dim lastTrainsetColumn As Integer
    Dim countPresetCarriages As Integer
    Dim countTrainsetCarriages As Integer
    Dim presetSheet As Worksheet
    Dim trainsetSheet As Worksheet
    Dim i As Integer
    
    Set tableRange = Worksheets("Gerbong").ListObjects("InitGerbong").Range
    Set typeColumn = tableRange.Rows(1)
    If Not typeColumn Is Nothing Then
        typeRowCount = typeColumn.End(xlDown).Row - typeColumn.Row
    End If
    ' changing carriage on preset trainset
    Set presetSheet = ThisWorkbook.Sheets("Preset Trainset")

    lastPresetColumn = presetSheet.Cells(3, presetSheet.Columns.Count).End(xlToLeft).Column
    countPresetCarriages = lastPresetColumn - 2

    If countPresetCarriages > typeRowCount Then
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(3, lastPresetColumn)).UnMerge
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(presetSheet.Rows.Count, lastPresetColumn)).ClearFormats
        presetSheet.Range(presetSheet.Cells(3, typeRowCount + 3), presetSheet.Cells(presetSheet.Rows.Count, lastPresetColumn)).ClearContents
    Else
        presetSheet.Cells(3, lastPresetColumn).ClearContents
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(presetSheet.Rows.Count, lastPresetColumn)).UnMerge
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(presetSheet.Rows.Count, lastPresetColumn)).ClearFormats

        For i = 1 To typeRowCount
            presetSheet.Cells(3, i + 2).Value = typeColumn.Rows(i + 1).Value
            presetSheet.Cells(3, i + 2).HorizontalAlignment = xlCenter
            presetSheet.Cells(3, i + 2).Borders.LineStyle = xlContinuous
            presetSheet.Cells(3, i + 2).Borders.Weight = xlThin
            presetSheet.Cells(3, i + 2).Interior.Color = rgb(142, 169, 219)
        Next i
    End If
        lastPresetColumn = presetSheet.Cells(3, presetSheet.Columns.Count).End(xlToLeft).Column
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(presetSheet.Cells(presetSheet.Rows.Count, 1).End(xlUp).Row, lastPresetColumn)).HorizontalAlignment = xlCenter
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(presetSheet.Cells(presetSheet.Rows.Count, 1).End(xlUp).Row, lastPresetColumn)).Borders.LineStyle = xlContinuous
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(presetSheet.Cells(presetSheet.Rows.Count, 1).End(xlUp).Row, lastPresetColumn)).Borders.Weight = xlThin
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(3, lastPresetColumn)).Interior.Color = rgb(142, 169, 219)
        presetSheet.Range(presetSheet.Cells(2, 3), presetSheet.Cells(2, lastPresetColumn)).Merge
    

    ' changing carriage on trainset
    Set trainsetSheet = ThisWorkbook.Sheets("Trainset")

    lastTrainsetColumn = trainsetSheet.Cells(3, trainsetSheet.Columns.Count).End(xlToLeft).Column
    countTrainsetCarriages = lastTrainsetColumn - 3

    If countTrainsetCarriages > typeRowCount Then
        trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(3, lastTrainsetColumn)).UnMerge
        trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(trainsetSheet.Rows.Count, lastTrainsetColumn)).ClearFormats
        trainsetSheet.Range(trainsetSheet.Cells(3, typeRowCount + 4), trainsetSheet.Cells(trainsetSheet.Rows.Count, lastTrainsetColumn)).ClearContents
    Else
        trainsetSheet.Cells(3, lastTrainsetColumn).ClearContents
        trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(trainsetSheet.Rows.Count, lastTrainsetColumn)).UnMerge
        trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(trainsetSheet.Rows.Count, lastTrainsetColumn)).ClearFormats

        For i = 1 To typeRowCount
            trainsetSheet.Cells(3, i + 3).Value = typeColumn.Rows(i + 1).Value
            trainsetSheet.Cells(3, i + 3).HorizontalAlignment = xlCenter
            trainsetSheet.Cells(3, i + 3).Borders.LineStyle = xlContinuous
            trainsetSheet.Cells(3, i + 3).Borders.Weight = xlThin
            trainsetSheet.Cells(3, i + 3).Interior.Color = rgb(142, 169, 219)
        Next i
    End If
    

    lastTrainsetColumn = trainsetSheet.Cells(3, trainsetSheet.Columns.Count).End(xlToLeft).Column
    trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(trainsetSheet.Cells(trainsetSheet.Rows.Count, 1).End(xlUp).Row, lastTrainsetColumn)).HorizontalAlignment = xlCenter
    trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(2, lastTrainsetColumn)).Merge
    trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(2, lastTrainsetColumn)).Borders.LineStyle = xlContinuous
    trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(3, lastTrainsetColumn)).Borders.Weight = xlThin
    trainsetSheet.Range(trainsetSheet.Cells(2, 4), trainsetSheet.Cells(3, lastTrainsetColumn)).Interior.Color = rgb(142, 169, 219)
    
End Sub

Sub changePresetTrainsetCount(changedCell As Range)
    Dim newValue As String
    Dim presetSheet As Worksheet
    Dim foundCell As Range
    
    newValue = changedCell.Value
    Set presetSheet = ThisWorkbook.Sheets("Preset Trainset")
    
    ' Find the new value in the Preset sheet
    Set foundCell = presetSheet.Range("B4:B" & presetSheet.Cells(presetSheet.Rows.Count, "B").End(xlUp).Row).Find(What:=newValue, LookIn:=xlValues, LookAt:=xlWhole)
    
    If Not foundCell Is Nothing Then
        ' Determine the number of columns to copy from row 3 of Preset sheet
        colCount = Application.WorksheetFunction.CountA(presetSheet.Rows(3))
        
        ' Update the cells in the same row to match the columns in row 3 of Preset sheet
        For i = 1 To colCount
            changedCell.Offset(0, i).Value = foundCell.Offset(0, i).Value
        Next i
    Else
        MsgBox "Value not found in Preset sheet."
    End If
End Sub

Sub changePresetTrainset()
    Dim wsPreset As Worksheet
    Dim wsTrainset As Worksheet
    Dim validationRange As Range
    Dim lastRow As Long
    Dim i As Long

    Set wsPreset = ThisWorkbook.Sheets("Preset Trainset")
    Set wsTrainset = ThisWorkbook.Sheets("Trainset")

    lastRow = wsPreset.Cells(wsPreset.Rows.Count, "B").End(xlUp).Row
    Set validationRange = wsPreset.Range("B4:B" & lastRow)

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
        Call changePresetTrainsetCount(wsTrainset.Cells(3 + i, 3))
    Next i
End Sub


' draft
Sub SaveAndUpload()
    Dim wb As Workbook
    Dim newWb As Workbook
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
    url = "http://127.0.0.1:8000/api/upload-project"

    ' Set the workbook to the current workbook
    Set wb = ThisWorkbook

    newFilePath = wb.Path & "\" & Replace(wb.Name, ".xlsm", ".xlsx")
    ' Save the workbook as .xlsx format
    Application.DisplayAlerts = False
    wb.SaveAs newFilePath, FileFormat:=xlOpenXMLWorkbook
    ' wb.Close
    Application.DisplayAlerts = True


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

    ' Send the request
    xmlHttp.Send fileData

    ' Get the response
    response = xmlHttp.responseText

    MsgBox "File uploaded successfully. Response: " & response
    ' Delete the created file
    ' Kill newFilePath
End Sub