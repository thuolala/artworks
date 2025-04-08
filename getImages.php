<?php
if (isset($_GET['folder'])) {
    $folder = $_GET['folder']; // Get folder from AJAX request
    $allowedExtensions = ['jpg', 'jpeg', 'png']; // Allowed image types
    $imagePaths = [];

    if (is_dir($folder)) {
        $files = array_diff(scandir($folder), ['.', '..']); // Read files

        foreach ($files as $file) {
            $filePath = "$folder/$file";
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));

            // Only add valid images
            if (in_array($ext, $allowedExtensions)) {
                $imagePaths[] = $filePath;
            }
        }
    }

    echo json_encode($imagePaths);
}
?>
