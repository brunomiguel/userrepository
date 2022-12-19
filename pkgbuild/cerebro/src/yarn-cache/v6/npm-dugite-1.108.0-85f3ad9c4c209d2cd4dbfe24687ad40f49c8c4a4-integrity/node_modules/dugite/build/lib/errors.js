"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** The git errors which can be parsed from failed git commands. */
var GitError;
(function (GitError) {
    GitError[GitError["SSHKeyAuditUnverified"] = 0] = "SSHKeyAuditUnverified";
    GitError[GitError["SSHAuthenticationFailed"] = 1] = "SSHAuthenticationFailed";
    GitError[GitError["SSHPermissionDenied"] = 2] = "SSHPermissionDenied";
    GitError[GitError["HTTPSAuthenticationFailed"] = 3] = "HTTPSAuthenticationFailed";
    GitError[GitError["RemoteDisconnection"] = 4] = "RemoteDisconnection";
    GitError[GitError["HostDown"] = 5] = "HostDown";
    GitError[GitError["RebaseConflicts"] = 6] = "RebaseConflicts";
    GitError[GitError["MergeConflicts"] = 7] = "MergeConflicts";
    GitError[GitError["HTTPSRepositoryNotFound"] = 8] = "HTTPSRepositoryNotFound";
    GitError[GitError["SSHRepositoryNotFound"] = 9] = "SSHRepositoryNotFound";
    GitError[GitError["PushNotFastForward"] = 10] = "PushNotFastForward";
    GitError[GitError["BranchDeletionFailed"] = 11] = "BranchDeletionFailed";
    GitError[GitError["DefaultBranchDeletionFailed"] = 12] = "DefaultBranchDeletionFailed";
    GitError[GitError["RevertConflicts"] = 13] = "RevertConflicts";
    GitError[GitError["EmptyRebasePatch"] = 14] = "EmptyRebasePatch";
    GitError[GitError["NoMatchingRemoteBranch"] = 15] = "NoMatchingRemoteBranch";
    GitError[GitError["NoExistingRemoteBranch"] = 16] = "NoExistingRemoteBranch";
    GitError[GitError["NothingToCommit"] = 17] = "NothingToCommit";
    GitError[GitError["NoSubmoduleMapping"] = 18] = "NoSubmoduleMapping";
    GitError[GitError["SubmoduleRepositoryDoesNotExist"] = 19] = "SubmoduleRepositoryDoesNotExist";
    GitError[GitError["InvalidSubmoduleSHA"] = 20] = "InvalidSubmoduleSHA";
    GitError[GitError["LocalPermissionDenied"] = 21] = "LocalPermissionDenied";
    GitError[GitError["InvalidMerge"] = 22] = "InvalidMerge";
    GitError[GitError["InvalidRebase"] = 23] = "InvalidRebase";
    GitError[GitError["NonFastForwardMergeIntoEmptyHead"] = 24] = "NonFastForwardMergeIntoEmptyHead";
    GitError[GitError["PatchDoesNotApply"] = 25] = "PatchDoesNotApply";
    GitError[GitError["BranchAlreadyExists"] = 26] = "BranchAlreadyExists";
    GitError[GitError["BadRevision"] = 27] = "BadRevision";
    GitError[GitError["NotAGitRepository"] = 28] = "NotAGitRepository";
    GitError[GitError["CannotMergeUnrelatedHistories"] = 29] = "CannotMergeUnrelatedHistories";
    GitError[GitError["LFSAttributeDoesNotMatch"] = 30] = "LFSAttributeDoesNotMatch";
    GitError[GitError["BranchRenameFailed"] = 31] = "BranchRenameFailed";
    GitError[GitError["PathDoesNotExist"] = 32] = "PathDoesNotExist";
    GitError[GitError["InvalidObjectName"] = 33] = "InvalidObjectName";
    GitError[GitError["OutsideRepository"] = 34] = "OutsideRepository";
    GitError[GitError["LockFileAlreadyExists"] = 35] = "LockFileAlreadyExists";
    GitError[GitError["NoMergeToAbort"] = 36] = "NoMergeToAbort";
    GitError[GitError["LocalChangesOverwritten"] = 37] = "LocalChangesOverwritten";
    GitError[GitError["UnresolvedConflicts"] = 38] = "UnresolvedConflicts";
    GitError[GitError["GPGFailedToSignData"] = 39] = "GPGFailedToSignData";
    GitError[GitError["ConflictModifyDeletedInBranch"] = 40] = "ConflictModifyDeletedInBranch";
    // Start of GitHub-specific error codes
    GitError[GitError["PushWithFileSizeExceedingLimit"] = 41] = "PushWithFileSizeExceedingLimit";
    GitError[GitError["HexBranchNameRejected"] = 42] = "HexBranchNameRejected";
    GitError[GitError["ForcePushRejected"] = 43] = "ForcePushRejected";
    GitError[GitError["InvalidRefLength"] = 44] = "InvalidRefLength";
    GitError[GitError["ProtectedBranchRequiresReview"] = 45] = "ProtectedBranchRequiresReview";
    GitError[GitError["ProtectedBranchForcePush"] = 46] = "ProtectedBranchForcePush";
    GitError[GitError["ProtectedBranchDeleteRejected"] = 47] = "ProtectedBranchDeleteRejected";
    GitError[GitError["ProtectedBranchRequiredStatus"] = 48] = "ProtectedBranchRequiredStatus";
    GitError[GitError["PushWithPrivateEmail"] = 49] = "PushWithPrivateEmail";
    // End of GitHub-specific error codes
    GitError[GitError["ConfigLockFileAlreadyExists"] = 50] = "ConfigLockFileAlreadyExists";
    GitError[GitError["RemoteAlreadyExists"] = 51] = "RemoteAlreadyExists";
    GitError[GitError["TagAlreadyExists"] = 52] = "TagAlreadyExists";
    GitError[GitError["MergeWithLocalChanges"] = 53] = "MergeWithLocalChanges";
    GitError[GitError["RebaseWithLocalChanges"] = 54] = "RebaseWithLocalChanges";
    GitError[GitError["MergeCommitNoMainlineOption"] = 55] = "MergeCommitNoMainlineOption";
    GitError[GitError["UnsafeDirectory"] = 56] = "UnsafeDirectory";
})(GitError = exports.GitError || (exports.GitError = {}));
/** A mapping from regexes to the git error they identify. */
exports.GitErrorRegexes = {
    'ERROR: ([\\s\\S]+?)\\n+\\[EPOLICYKEYAGE\\]\\n+fatal: Could not read from remote repository.': GitError.SSHKeyAuditUnverified,
    "fatal: Authentication failed for 'https://": GitError.HTTPSAuthenticationFailed,
    'fatal: Authentication failed': GitError.SSHAuthenticationFailed,
    'fatal: Could not read from remote repository.': GitError.SSHPermissionDenied,
    'The requested URL returned error: 403': GitError.HTTPSAuthenticationFailed,
    'fatal: [Tt]he remote end hung up unexpectedly': GitError.RemoteDisconnection,
    "fatal: unable to access '(.+)': Failed to connect to (.+): Host is down": GitError.HostDown,
    "Cloning into '(.+)'...\nfatal: unable to access '(.+)': Could not resolve host: (.+)": GitError.HostDown,
    'Resolve all conflicts manually, mark them as resolved with': GitError.RebaseConflicts,
    '(Merge conflict|Automatic merge failed; fix conflicts and then commit the result)': GitError.MergeConflicts,
    "fatal: repository '(.+)' not found": GitError.HTTPSRepositoryNotFound,
    'ERROR: Repository not found': GitError.SSHRepositoryNotFound,
    "\\((non-fast-forward|fetch first)\\)\nerror: failed to push some refs to '.*'": GitError.PushNotFastForward,
    "error: unable to delete '(.+)': remote ref does not exist": GitError.BranchDeletionFailed,
    '\\[remote rejected\\] (.+) \\(deletion of the current branch prohibited\\)': GitError.DefaultBranchDeletionFailed,
    "error: could not revert .*\nhint: after resolving the conflicts, mark the corrected paths\nhint: with 'git add <paths>' or 'git rm <paths>'\nhint: and commit the result with 'git commit'": GitError.RevertConflicts,
    "Applying: .*\nNo changes - did you forget to use 'git add'\\?\nIf there is nothing left to stage, chances are that something else\n.*": GitError.EmptyRebasePatch,
    'There are no candidates for (rebasing|merging) among the refs that you just fetched.\nGenerally this means that you provided a wildcard refspec which had no\nmatches on the remote end.': GitError.NoMatchingRemoteBranch,
    "Your configuration specifies to merge with the ref '(.+)'\nfrom the remote, but no such ref was fetched.": GitError.NoExistingRemoteBranch,
    'nothing to commit': GitError.NothingToCommit,
    "[Nn]o submodule mapping found in .gitmodules for path '(.+)'": GitError.NoSubmoduleMapping,
    "fatal: repository '(.+)' does not exist\nfatal: clone of '.+' into submodule path '(.+)' failed": GitError.SubmoduleRepositoryDoesNotExist,
    "Fetched in submodule path '(.+)', but it did not contain (.+). Direct fetching of that commit failed.": GitError.InvalidSubmoduleSHA,
    "fatal: could not create work tree dir '(.+)'.*: Permission denied": GitError.LocalPermissionDenied,
    'merge: (.+) - not something we can merge': GitError.InvalidMerge,
    'invalid upstream (.+)': GitError.InvalidRebase,
    'fatal: Non-fast-forward commit does not make sense into an empty head': GitError.NonFastForwardMergeIntoEmptyHead,
    'error: (.+): (patch does not apply|already exists in working directory)': GitError.PatchDoesNotApply,
    "fatal: [Aa] branch named '(.+)' already exists.?": GitError.BranchAlreadyExists,
    "fatal: bad revision '(.*)'": GitError.BadRevision,
    'fatal: [Nn]ot a git repository \\(or any of the parent directories\\): (.*)': GitError.NotAGitRepository,
    'fatal: refusing to merge unrelated histories': GitError.CannotMergeUnrelatedHistories,
    'The .+ attribute should be .+ but is .+': GitError.LFSAttributeDoesNotMatch,
    'fatal: Branch rename failed': GitError.BranchRenameFailed,
    "fatal: path '(.+)' does not exist .+": GitError.PathDoesNotExist,
    "fatal: invalid object name '(.+)'.": GitError.InvalidObjectName,
    "fatal: .+: '(.+)' is outside repository": GitError.OutsideRepository,
    'Another git process seems to be running in this repository, e.g.': GitError.LockFileAlreadyExists,
    'fatal: There is no merge to abort': GitError.NoMergeToAbort,
    'error: (?:Your local changes to the following|The following untracked working tree) files would be overwritten by checkout:': GitError.LocalChangesOverwritten,
    'You must edit all merge conflicts and then\nmark them as resolved using git add|fatal: Exiting because of an unresolved conflict': GitError.UnresolvedConflicts,
    'error: gpg failed to sign the data': GitError.GPGFailedToSignData,
    'CONFLICT \\(modify/delete\\): (.+) deleted in (.+) and modified in (.+)': GitError.ConflictModifyDeletedInBranch,
    // GitHub-specific errors
    'error: GH001: ': GitError.PushWithFileSizeExceedingLimit,
    'error: GH002: ': GitError.HexBranchNameRejected,
    'error: GH003: Sorry, force-pushing to (.+) is not allowed.': GitError.ForcePushRejected,
    'error: GH005: Sorry, refs longer than (.+) bytes are not allowed': GitError.InvalidRefLength,
    'error: GH006: Protected branch update failed for (.+)\nremote: error: At least one approved review is required': GitError.ProtectedBranchRequiresReview,
    'error: GH006: Protected branch update failed for (.+)\nremote: error: Cannot force-push to a protected branch': GitError.ProtectedBranchForcePush,
    'error: GH006: Protected branch update failed for (.+)\nremote: error: Cannot delete a protected branch': GitError.ProtectedBranchDeleteRejected,
    'error: GH006: Protected branch update failed for (.+).\nremote: error: Required status check "(.+)" is expected': GitError.ProtectedBranchRequiredStatus,
    'error: GH007: Your push would publish a private email address.': GitError.PushWithPrivateEmail,
    'error: could not lock config file (.+): File exists': GitError.ConfigLockFileAlreadyExists,
    'error: remote (.+) already exists.': GitError.RemoteAlreadyExists,
    "fatal: tag '(.+)' already exists": GitError.TagAlreadyExists,
    'error: Your local changes to the following files would be overwritten by merge:\n': GitError.MergeWithLocalChanges,
    'error: cannot (pull with rebase|rebase): You have unstaged changes\\.\n\\s*error: [Pp]lease commit or stash them\\.': GitError.RebaseWithLocalChanges,
    'error: commit (.+) is a merge but no -m option was given': GitError.MergeCommitNoMainlineOption,
    "fatal: unsafe repository \\('(.+)' is owned by someone else\\)": GitError.UnsafeDirectory
};
/**
 * The error code for when git cannot be found. This most likely indicates a
 * problem with dugite itself.
 */
exports.GitNotFoundErrorCode = 'git-not-found-error';
/** The error code for when the path to a repository doesn't exist. */
exports.RepositoryDoesNotExistErrorCode = 'repository-does-not-exist-error';
//# sourceMappingURL=errors.js.map