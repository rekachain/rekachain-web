<!DOCTYPE html>
<html>
<head>
    <title>Scan Face Data</title>
</head>
<body>
    <h1>Scan Face Records</h1>
    
    <table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Image</th>
                <th>Status</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $scanFace)
            <tr>
                <td>{{ $scanFace->user_id }}</td>
                <td><img src="{{ $scanFace->image_path }}" width="100"></td>
                <td>{{ $scanFace->status }}</td>
                <td>{{ $scanFace->created_at }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
