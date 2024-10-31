Dim oldPanelValue As String
Public Sub Worksheet_SelectionChange(ByVal Target As Range)
    If Not Intersect(target, Me.ListObjects("InitPanel").DataBodyRange) Is Nothing Then
        If target.Count = 1 And target.Column = Me.ListObjects("InitPanel").ListColumns(1).Index Then
            oldPanelValue = Target.Value
        End If
    End If
End Sub
Private Sub Worksheet_Change(ByVal target As Range)
    If Not Intersect(target, Me.ListObjects("InitPanel").DataBodyRange) Is Nothing Then
        If target.Count = 1 And target.Column = Me.ListObjects("InitPanel").ListColumns(1).Index Then
            Call updatePanelValidation(target, oldPanelValue)
        End If
    End If
End Sub


