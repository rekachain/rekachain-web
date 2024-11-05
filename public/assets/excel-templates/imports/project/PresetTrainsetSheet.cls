Dim oldPresetValue As String
Public Sub Worksheet_SelectionChange(ByVal Target As Range)
    If Not Intersect(Target, Me.Range("A4:A" & Me.Cells(Me.Rows.Count, "A").End(xlUp).Row)) Is Nothing Then
        If Target.Count = 1 Then
            oldPresetValue = Target.Value
        End If
    End If
End Sub
Private Sub Worksheet_Change(ByVal target As Range)
    ' Check if the changed cell is B6
    If Not Intersect(target, Me.Range("A4:A" & Me.Cells(Me.Rows.Count, "A").End(xlUp).Row)) Is Nothing Then
        If target.Count = 1 Then
            Call changePresetTrainset(target, oldPresetValue)
        End If
    Else
        Call changePresetTrainset(target, "")
    End If
End Sub
