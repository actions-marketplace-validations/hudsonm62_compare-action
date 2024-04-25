# Compare Action 🔃

📂 Simply diffs 2 paths to see if they are the same or different. Supports globs, symlinks, dates, and a handful of ignores.

> By default, this will error if there are any differences, but it can be configured otherwise.

## Usage

```yaml
- uses: actions/checkout@v4
- uses: hudsonm62/compare-action@v1
  with:
    path1: "path/to/first"
    path2: "path/to/second"
    exclude: "**/*.js,**/*.ts"
    #error_same: true
```

## Configuration

| Input                   | Default | Description                                                                                                                        |
| ----------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `path1`                 | `null`  | The first path to compare (required)                                                                                               |
| `path2`                 | `null`  | The second path to compare (required)                                                                                              |
| `exclude`               | `null`  | Relative [minimatch] Glob pattern to filter out - Specify multiple patterns by separating with a comma (i.e. "`**/*.js,**/*.ts`"). |
| `include`               | `null`  | Relative [minimatch] Glob pattern to filter in - Specify multiple patterns by separating with a comma (i.e. "`**/*.js,**/*.ts`").  |
| `compare_size`          | `true`  | If true, will compare the size of the files (always first).                                                                        |
| `compare_content`       | `true`  | If true, will compare the content of the files.                                                                                    |
| `error_same`            | `false` | If true, the action will fail if the files are the same. This changes depending on `no_error` and `warn_instead`                   |
| `no_error`              | `false` | Disable erroring. Simply outputs resulting summary.                                                                                |
| `warn_instead`          | `false` | If true, replaces any diff-related failing errors with just a warning.                                                             |
| `output_diff`           | `false` | If true, outputs each compare result to console (matched or not) line by line. Not recommended for large file sets.                |
| `ignore_line_endings`   | `false` | If true, will ignore line endings when comparing files - (CRLF/LF).                                                                |
| `ignore_whitespace`     | `false` | If true, ignore whitespace only at both the beginning and end of a line.                                                           |
| `ignore_all_whitespace` | `false` | If true, ignores all whitespace in files.                                                                                          |
| `ignore_empty_lines`    | `false` | If true, will ignore empty lines when comparing files.                                                                             |
| `ignore_empty_dirs`     | `false` | If true, will ignore empty directories when comparing directories.                                                                 |
| `ignore_name_case`      | `false` | If true, will ignore the case of the file names.                                                                                   |
| `compare_only_name`     | `false` | If true, will only compare the name of the files. (can be used in tandem with `compare_date`)                                      |
| `compare_date`          | `false` | If true, will _also_ compare the date of the files. (can be used in tandem with any `compare_**` flags)                            |

> Inputs `path1` and `path2` will automatically get converted to their platform-specific path.<br>_Always_ use `/` in your Globs, it will still work as per the platform.

## Common Issues

- **Exclude Glob isn't working**
  - Double check its actually a [minimatch] glob pattern.
  - Make sure the pattern is relative to the root of the comparing directory (`path1`/`path2`) and NOT your `cwd`.
    - For example, if you want to exclude `thisFolder` folder, you would use something like `**/thisFolder/**` (or `./thisFolder` if it's always in the root of the comparing directory).
- **Out of Memory?**
  - Turn off `output_diff` if you have a large file set, as it prevents the array of results from being created.
  - Alternatively, you can split the Action into multiple steps that compare smaller sets at a time.
  - You can also try playing with the `compare_size` and `compare_content` flags to see if you can reduce the memory usage.
- **"No such file or directory"**
  - Ensure you've checked out your repo
  - Check the job has at least `read` for `contents` permissions.
  - If you're using a relative path, make sure you're in the right directory.

## Credits

This is essentially an Action wrapper for [dir-compare](https://www.npmjs.com/package/dir-compare). Go check it out out!

## License

This project is licensed under the MIT License

[minimatch]: https://github.com/isaacs/minimatch
