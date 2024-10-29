Dim oldCarriageTypeValue As String
Public Sub Worksheet_SelectionChange(ByVal Target As Range)
    If Not Intersect(Target, Me.Range("A3:A" & Me.Cells(Me.Rows.Count, "A").End(xlUp).Row)) Is Nothing Then
        If Target.Count = 1 Then
            oldCarriageTypeValue = Target.Value
        End If
    End If
End Sub
Private Sub Worksheet_Change(ByVal Target As Range)
    If Not Intersect(Target, Me.ListObjects("InitGerbong").DataBodyRange) Is Nothing Then
        Call changeCarriage(Target)
    End If
    If Not Intersect(Target, Me.Range("A3:A" & Me.Cells(Me.Rows.Count, "A").End(xlUp).Row)) Is Nothing Then 
        Call UpdateCarriageValidation(Target, oldCarriageTypeValue)
    End If
End Sub


