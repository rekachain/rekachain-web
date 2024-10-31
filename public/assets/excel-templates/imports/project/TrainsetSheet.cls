Private Sub Worksheet_Change(ByVal Target As Range)
    If Not Intersect(Target, Me.Range("C4:C" & Me.Cells(Me.Rows.Count, "C").End(xlUp).Row)) Is Nothing Then
        Call changePresetTrainsetCount(Target)
    End If
End Sub
