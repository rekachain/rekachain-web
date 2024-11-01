Private Sub Worksheet_Change(ByVal Target As Range)
    ' Check if the changed cell is B6
    If Not Intersect(Target, Me.Range("B6")) Is Nothing Then
        ' Call the CreateRows macro
        Call createTrainsets
    End If
End Sub

