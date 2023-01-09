/** The git errors which can be parsed from failed git commands. */
export declare enum GitError {
    SSHKeyAuditUnverified = 0,
    SSHAuthenticationFailed = 1,
    SSHPermissionDenied = 2,
    HTTPSAuthenticationFailed = 3,
    RemoteDisconnection = 4,
    HostDown = 5,
    RebaseConflicts = 6,
    MergeConflicts = 7,
    HTTPSRepositoryNotFound = 8,
    SSHRepositoryNotFound = 9,
    PushNotFastForward = 10,
    BranchDeletionFailed = 11,
    DefaultBranchDeletionFailed = 12,
    RevertConflicts = 13,
    EmptyRebasePatch = 14,
    NoMatchingRemoteBranch = 15,
    NoExistingRemoteBranch = 16,
    NothingToCommit = 17,
    NoSubmoduleMapping = 18,
    SubmoduleRepositoryDoesNotExist = 19,
    InvalidSubmoduleSHA = 20,
    LocalPermissionDenied = 21,
    InvalidMerge = 22,
    InvalidRebase = 23,
    NonFastForwardMergeIntoEmptyHead = 24,
    PatchDoesNotApply = 25,
    BranchAlreadyExists = 26,
    BadRevision = 27,
    NotAGitRepository = 28,
    CannotMergeUnrelatedHistories = 29,
    LFSAttributeDoesNotMatch = 30,
    BranchRenameFailed = 31,
    PathDoesNotExist = 32,
    InvalidObjectName = 33,
    OutsideRepository = 34,
    LockFileAlreadyExists = 35,
    NoMergeToAbort = 36,
    LocalChangesOverwritten = 37,
    UnresolvedConflicts = 38,
    GPGFailedToSignData = 39,
    ConflictModifyDeletedInBranch = 40,
    PushWithFileSizeExceedingLimit = 41,
    HexBranchNameRejected = 42,
    ForcePushRejected = 43,
    InvalidRefLength = 44,
    ProtectedBranchRequiresReview = 45,
    ProtectedBranchForcePush = 46,
    ProtectedBranchDeleteRejected = 47,
    ProtectedBranchRequiredStatus = 48,
    PushWithPrivateEmail = 49,
    ConfigLockFileAlreadyExists = 50,
    RemoteAlreadyExists = 51,
    TagAlreadyExists = 52,
    MergeWithLocalChanges = 53,
    RebaseWithLocalChanges = 54,
    MergeCommitNoMainlineOption = 55,
    UnsafeDirectory = 56
}
/** A mapping from regexes to the git error they identify. */
export declare const GitErrorRegexes: {
    [regexp: string]: GitError;
};
/**
 * The error code for when git cannot be found. This most likely indicates a
 * problem with dugite itself.
 */
export declare const GitNotFoundErrorCode = "git-not-found-error";
/** The error code for when the path to a repository doesn't exist. */
export declare const RepositoryDoesNotExistErrorCode = "repository-does-not-exist-error";
