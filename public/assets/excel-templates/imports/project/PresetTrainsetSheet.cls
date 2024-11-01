Private Sub Worksheet_Change(ByVal target As Range)
    ' Check if the changed cell is B6
    ' If Not Intersect(target, Me.Range("B6")) Is Nothing Then
    '     ' Call the CreateRows macro
    ' End If
    Call changePresetTrainset()
End Sub
