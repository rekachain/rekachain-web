Public panelRowCount as Long
Public oldPanelValue As String

Private Sub Workbook_Open()
    panelRowCount = ThisWorkbook.Sheets("Panel").UsedRange.Rows.Count
End Sub

Public Sub Worksheet_SelectionChange(ByVal Target As Range)
    If Not Intersect(target, Me.ListObjects("InitPanel").DataBodyRange) Is Nothing Then
        If target.Count = 1 And target.Column = Me.ListObjects("InitPanel").ListColumns(1).Index Then
            oldPanelValue = Target.Value
        End If
    End If
End Sub

Private Sub Worksheet_Change(ByVal target As Range)
    Dim wsPanel as Worksheet
    Set wsPanel = ThisWorkbook.Sheets("Panel")

    panelRowCount = wsPanel.UsedRange.Rows.Count

    If Not Intersect(target, Me.ListObjects("InitPanel").DataBodyRange) Is Nothing Then
        If target.Count = 1 And target.Column = Me.ListObjects("InitPanel").ListColumns(1).Index Then
            Call updatePanelValidation(target, oldPanelValue)
        Else
            If target.Count > 1 Then
                Dim cell As Range
                For Each cell In target
                    If cell.Column = Me.ListObjects("InitPanel").ListColumns(1).Index Then
                        Call updatePanelValidation(cell, "")
                    End If
                Next cell
            End If
        End If
    End If


    if wsPanel.UsedRange.Rows.Count < panelRowCount then
        Call updatePanelValidation(target, "")
    end if
End Sub


